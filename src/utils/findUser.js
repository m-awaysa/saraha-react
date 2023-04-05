const findUSer =(users, userID)=>{
    const userIndex = users.findIndex(user => user._id === userID);
    if(userIndex === -1) return {};
    return users[userIndex];
}

export default findUSer;