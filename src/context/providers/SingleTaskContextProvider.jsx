import { useState, useEffect, memo } from "react";
import propTypes from "prop-types";
import { singleTaskContext } from "../contexts";

const API_HOST = "http://localhost:3001";

const SingleTaskContextProvider = ({ children, match, history }) => {
  const [singleTask, setSingleTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const { id } = match.params;

    (async () => {
      try {
        const data = await fetch(`${API_HOST}/task/${id}`).then((res) =>
          res.json()
        );

        if (data.error) throw data.error;
        setSingleTask(data);
      } catch (error) {
        console.log("Get the single task Error ", error);
        history.push(`/error/${error.status}`);
      }
    })();
  }, []);

  const toggleHideAddEditTaskModal = () => {
    setIsEditable(!isEditable);
  };

  const handleDelete = () => {
    const { id } = match.params;

    setLoading(true);

    (async () => {
      try {
        const data = await fetch(`${API_HOST}/task/${id}`, {
          method: "DELETE",
        }).then((res) => res.json());

        if (data.error) {
          throw data.error;
        }
        history.push("/");
      } catch (error) {
        console.log("Delete the single task Error", error);
        setLoading(false);
      }
    })();
  };

  const handleEdit = (editableTask) => {
    setLoading(true);
    (async () => {
      try {
        const data = await fetch(`${API_HOST}/task/${singleTask._id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(editableTask),
        }).then((res) => res.json());

        if (data.error) {
          throw data.error;
        }
        setSingleTask(data);
      } catch (error) {
        console.log("Edit the single task Error", error);
      } finally {
        setLoading(false);
        setIsEditable(false);
      }
    })();
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <singleTaskContext.Provider
      value={{
        //state
        singleTask,
        loading,
        isEditable,
        //functions
        toggleHideAddEditTaskModal,
        handleDelete,
        handleEdit,
        goBack,
      }}
    >
      {children}
    </singleTaskContext.Provider>
  );
};

SingleTaskContextProvider.propTypes = {
  children: propTypes.object.isRequired,
  match: propTypes.object.isRequired,
  history: propTypes.object.isRequired,
};

export default memo(SingleTaskContextProvider);
