import myPassData from "../data/myPassData";

const savePass = (event, paymentType, numAdults, numChildren) => {
  const newPass = {
    id: myPassData.length + 1,
    event,
    eventTitle: event.title,
    paymentType,
    numAdults,
    numChildren,
    status: 'active'
  };

  myPassData.push(newPass);
  return newPass;
};

export default savePass;
