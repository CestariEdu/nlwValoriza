import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";


class ListUserSendComplimentsService {

  async execute(user_id: string) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

    const filterCompliments = await complimentsRepositories.find({
      where: {
         user_sender: user_id,
      },
      relations: ['userSender', 'userReceiver', 'tag']
    });

    const compliments = {
      id: filterCompliments[0].id,
      user_sender: filterCompliments[0].userSender.name,
      user_receiver: filterCompliments[0].userReceiver.name,
      tag: filterCompliments[0].tag.name,
      message: filterCompliments[0].message,
      created_at: filterCompliments[0].created_at,
    };

    return compliments;
  }

}

export { ListUserSendComplimentsService };
