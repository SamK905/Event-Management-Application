import myPassData from "../data/myPassData";

const savePass = (event, paymentType, numAdults, numChildren) => {
  const newPass = {
    id: myPassData.length + 1,
    event,
    paymentType,
    numAdults,
    numChildren,
    status: 'active'
  };

  myPassData.push(newPass);
  return newPass; // return the new pass data
};

export default savePass;
