import room, { IMassage, IRoom } from "../models/room";
import Room from "../models/room";

export const getRoomByName = async (room: string) => {
  try {
    const faondRoom = await Room.findOne({ room });
    return faondRoom;
  } catch (error) {
    console.log("faondRoom service error");
  }
};

export const addMassage = async (room: string, massage: IMassage) => {
  try {
    const faondRoom = await Room.findOne({ room });

    faondRoom?.massages.push({
      content: massage.content,
      userSended: massage.userSended,
      timeStamps: massage.timeStamps,
    });
    await faondRoom?.save();
  } catch (err) {
    console.log(err);
  }
};
export const laoudPreMassages = () => {};
