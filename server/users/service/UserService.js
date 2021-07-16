// não entra no padrao MVC(model, view, controller) porem é utilizado pela
// ijunior

// classe que ira conter metodos para isolar logica que aplicaremos no controler
const User = require('../model/User');

class UserService {
  // metodo de criação do sequelize
  async createUser(user) {
    await User.create(user);
  }

  // metodo para busca no banco de dados
  async getAllUsers() {
    return await User.findAll({raw: true});
  }
  async getUserById(id) {
    return await User.findByPk(id, {raw: true});
  }

  async updateUser(id, body) {
    // const user = await User.findByPk(id, {raw: true});
    // user.update(body);
    await User.update(body, {where: {id: id}});
  }

  async deleteUser(id) {
    // const user = await User.findByPk(id, {raw: true});
    // user.destroy();
    await User.destroy({where: {id: id}});
  }
}

module.exports = new UserService;
