import { createStore } from "redux";
import types from "./actionsType";

const initialState = {
  ToDoState: {
    tasks: [],
    selectedTasksIDs: new Set(),
    isOpenAddEditTaskModal: false,
    isOpenConfirmModal: false,
    editableTask: null,
    selectedSingleTask: null,
  },
  SingleTaskState: {
    singleTask: null,
    isEditable: false,
  },
  loading: false,
};

const reducer = (state = initialState, action) => {
  const {
    ToDoState,
    ToDoState: { isOpenAddEditTaskModal, isOpenConfirmModal, editableTask },
    SingleTaskState,
    SingleTaskState: { isEditable },
  } = state;

  switch (action.type) {
    // ToDo actions
    case types.SET_IS_OPEN_TASK_MODAL: {
      return {
        ...state,
        ToDoState: {
          ...ToDoState,
          isOpenAddEditTaskModal: !isOpenAddEditTaskModal,
        },
      };
    }
    case types.SET_IS_OPEN_CONFIRM_MODAL: {
      let id = null;

      if (ToDoState.selectedTasksIDs.size === 1) {
        ToDoState.selectedTasksIDs.forEach((_id) => {
          id = _id;
        });
      }
      const selectedSingleTask = ToDoState.tasks.find(
        (task) => task._id === id
      );
      return {
        ...state,
        ToDoState: {
          ...ToDoState,
          isOpenConfirmModal: !isOpenConfirmModal,
          selectedSingleTask,
        },
      };
    }
    case types.SET_EDITABLE_TASK: {
      return {
        ...state,
        ToDoState: {
          ...ToDoState,
          editableTask: action.editableTask,
        },
      };
    }
    case types.ADD_TASK: {
      const tasks = [...ToDoState.tasks];

      tasks.push(action.data);
      return {
        ...state,
        ToDoState: {
          ...ToDoState,
          tasks,
        },
      };
    }
    case types.EDIT_TASK: {
      const tasks = [...ToDoState.tasks];
      const ind = tasks.findIndex((task) => task._id === action.data._id);

      tasks[ind] = action.data;
      return {
        ...state,
        ToDoState: {
          ...ToDoState,
          tasks,
        },
      };
    }
    case types.DELETE_TASK: {
      const tasks = [...ToDoState.tasks].filter(
        (task) => task._id !== action._id
      );

      return {
        ...state,
        ToDoState: {
          ...ToDoState,
          tasks,
        },
      };
    }
    case types.SELECT_TASK: {
      const selectedTasksIDs = new Set(ToDoState.selectedTasksIDs);

      if (selectedTasksIDs.has(action._id)) {
        selectedTasksIDs.delete(action._id);
      } else {
        selectedTasksIDs.add(action._id);
      }

      return {
        ...state,
        ToDoState: {
          ...ToDoState,
          selectedTasksIDs,
        },
      };
    }
    case types.SELECT_ALL_TASKS: {
      const selectedTasksIDs = new Set(ToDoState.selectedTasksIDs);

      ToDoState.tasks.forEach((task) => {
        selectedTasksIDs.add(task._id);
      });

      return {
        ...state,
        ToDoState: {
          ...ToDoState,
          selectedTasksIDs:
            ToDoState.selectedTasksIDs.size !== ToDoState.tasks.length
              ? selectedTasksIDs
              : new Set(),
        },
      };
    }
    case types.DELETE_SELECTED_TASKS: {
      const tasks = [...ToDoState.tasks].filter(
        (task) => !ToDoState.selectedTasksIDs.has(task._id)
      );

      return {
        ...state,
        ToDoState: {
          ...ToDoState,
          tasks,
          selectedTasksIDs: new Set(),
        },
      };
    }
    case types.SET_TASKS: {
      return {
        ...state,
        ToDoState: {
          ...ToDoState,
          tasks: action.data,
        },
      };
    }

    // SingleTask actions
    case types.SET_SINGLE_TASK: {
      return {
        ...state,
        SingleTaskState: {
          ...SingleTaskState,
          singleTask: action.data,
        },
      };
    }
    case types.REMOVE_SINGLE_TASK: {
      return {
        ...state,
        SingleTaskState: {
          ...SingleTaskState,
          singleTask: null,
        },
      };
    }
    case types.TOGGLE_HIDE_MODAL: {
      return {
        ...state,
        SingleTaskState: {
          ...SingleTaskState,
          isEditable: !isEditable,
        },
      };
    }
    case types.SET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.REMOVE_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export const store = createStore(reducer);
