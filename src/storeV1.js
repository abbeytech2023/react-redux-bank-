import { type } from "@testing-library/user-event/dist/type";
import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

function accountreducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
        loanPurpose: action.payload.purpose,
      };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload,
        balance: state.balance + action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case "account/payLoan":
      console.log("loan:", state.loan);
      console.log("balance:", state.balance);
      return {
        ...state,
        // loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan.amount,
      };

    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payLoan,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountreducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

// store.dispatch({ type: "account/deposit", payload: 500 });

// store.dispatch({ type: "account/withdraw", payload: 200 });

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "buy a car" },
// });

// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, purpose: purpose },
  };
}
function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(100));
store.dispatch(withdraw(400));
store.dispatch(requestLoan(400, "watch movie"));
console.log(store.getState());

function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return { type: "account/updateName", payload: fullName };
}

store.dispatch(createCustomer("Okeowo Abiola", "1234321"));
console.log(store.getState());
