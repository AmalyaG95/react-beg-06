import types from "../actionsType";

const initialState = {
  tasks: [],
  selectedTasksIDs: new Set(),
  isOpenAddEditTaskModal: false,
  isOpenConfirmModal: false,
  editableTask: null,
  selectedSingleTask: null,
};

const reducer = (state = initialState, action) => {
  const { isOpenAddEditTaskModal, isOpenConfirmModal } = state;

  switch (action.type) {
    case types.SET_IS_OPEN_TASK_MODAL: {
      return {
        ...state,
        isOpenAddEditTaskModal: !isOpenAddEditTaskModal,
      };
    }
    case types.SET_IS_OPEN_CONFIRM_MODAL: {
      let id = null;

      if (state.selectedTasksIDs.size === 1) {
        state.selectedTasksIDs.forEach((_id) => {
          id = _id;
        });
      }
      const selectedSingleTask = state.tasks.find((task) => task._id === id);
      return {
        ...state,
        isOpenConfirmModal: !isOpenConfirmModal,
        selectedSingleTask,
      };
    }
    case types.SET_EDITABLE_TASK: {
      return {
        ...state,
        editableTask: action.editableTask,
      };
    }
    case types.ADD_TASK: {
      const tasks = [...state.tasks];

      tasks.push(action.data);
      return {
        ...state,
        tasks,
      };
    }
    case types.EDIT_TASK: {
      const tasks = [...state.tasks];
      const ind = tasks.findIndex((task) => task._id === action.data._id);

      tasks[ind] = action.data;
      return {
        ...state,
        tasks,
      };
    }
    case types.DELETE_TASK: {
      const tasks = [...state.tasks].filter((task) => task._id !== action._id);

      return {
        ...state,
        tasks,
      };
    }
    case types.SELECT_TASK: {
      const selectedTasksIDs = new Set(state.selectedTasksIDs);

      if (selectedTasksIDs.has(action._id)) {
        selectedTasksIDs.delete(action._id);
      } else {
        selectedTasksIDs.add(action._id);
      }

      return {
        ...state,
        selectedTasksIDs,
      };
    }
    case types.SELECT_ALL_TASKS: {
      const selectedTasksIDs = new Set(state.selectedTasksIDs);

      state.tasks.forEach((task) => {
        selectedTasksIDs.add(task._id);
      });

      return {
        ...state,
        selectedTasksIDs:
          state.selectedTasksIDs.size !== state.tasks.length
            ? selectedTasksIDs
            : new Set(),
      };
    }
    case types.DELETE_SELECTED_TASKS: {
      const tasks = [...state.tasks].filter(
        (task) => !state.selectedTasksIDs.has(task._id)
      );

      return {
        ...state,
        tasks,
        selectedTasksIDs: new Set(),
      };
    }
    case types.SET_TASKS: {
      return {
        ...state,
        tasks: action.data,
      };
    }
    case types.RESET_TODO_DATA: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};

export default reducer;
