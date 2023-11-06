require("dotenv").config();
const User = require("../models/user.model.js");
const UserDetail = require("../models/userDetail.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const GREENEAT_USER = 1;
const SUPPLIER_USER = 2;
 
async function encrypt(password) {
	return await bcrypt.hash(password, 2);
}
 
function generateAccessToken(user) {
	return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "86400s" });
}
 
exports.findAll = async (req, res) => {
	try {
		const data = await User.findAll();
		res.send(data);
	} catch (error) {
		console.log(error);
		res.status(500).send("Erro ao processar requisição!");
	}
};
 
exports.findById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user.length) {
			res.status(400).send("Usuário não encontrado");
			return;
		}
		
		if (user[0].idusertype == 2){
			const location = await User.findUserLocation(user[0].id)
			if(location.length)
				user[0].location = {id: location[0].id, namearea: location[0].namearea}
		}

		res.send(user);
	} catch (error) {
		console.log(error);
		res.status(500).send("Erro ao processar requisição!");
	}
};

exports.update = async (req, res) => {
	try {
		
		const user = await User.findById(req.user.id);

		if (!user.length) {
			res.status(400).send("Usuário não encontrado!");
			return;
		}

		await User.update(req.user.id, req.body)

		res.status(200).send();

	} catch (error) {
		console.log(error);
		res.status(500).send("Erro ao processar requisição!");
	}
};


exports.delete = async (req, res) => {
	try {

		if (req.user.idusertype != GREENEAT_USER) {
			res.status(400).send("Apenas a greeneat pode excluir o cadastro");
			return;
		}

		const user = await User.findById(req.params.id);

		if (!user.length) {
			res.status(400).send("Usuário não encontrado!");
			return;
		}

		res.send(await User.delete(req.params.id));
	} catch (error) {
		console.log(error);
		res.status(500).send("Erro ao processar requisição!");
	}
};

exports.updateUserProfile = async (req, res) => {
  const userId = req.params.id; // Obtém o 'id' a partir dos parâmetros de rota

  const requestData = req.body;

  const user = {
    id: userId, // Use o 'id' da rota
    email: requestData.email,
  };

  const userDetail = {
    name: requestData.name,
    telephone: requestData.telephone,
    document: requestData.document,
    address: requestData.address,
    businessName: requestData.businessName,
    idUser: userId, // Use o 'id' da rota
  };
  console.log(user, userDetail)

  try {
    const result = await User.updateById(user, userDetail);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao atualizar o usuário.' });
  }
};
 
exports.create = async (req, res) => {
  try {
    const emailExists = await User.findByEmail(req.body.email);
    if (emailExists.length) {
      res.status(400).send("Email já existente!");
      return;
    }

    //if (req.body.idUserType == GREENEAT_USER) {
    //  res.status(400).send("Não é possível criar esse tipo de usuário");
    //  return;
    //}

    const user = new User({
      email: req.body.email,
      password: await encrypt(req.body.password),
      idUserType: req.body.idUserType,
    });

    const userDetail = new UserDetail({
      name: req.body.name,
      telephone: req.body.telephone,
      document: req.body.document,
      address: req.body.address,
      businessName: req.body.businessName,
    });

    let location = null;
    if (user.idUserType == SUPPLIER_USER) location = req.body.location;

    res.status(201).send(await User.create(user, userDetail, location));
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao processar requisição!");
  }
};

exports.delete = async (req, res) => {
	try {
  
		if (req.user.idusertype != GREENEAT_USER) {
			res.status(400).send("Apenas a greeneat pode excluir o cadastro");
			return;
		}
  
		const user = await User.findById(req.params.id);
  
		if (!user.length) {
			res.status(400).send("Usuário não encontrado!");
			return;
		}
  
		res.send(await User.delete(req.params.id));
	} catch (error) {
		console.log(error);
		res.status(500).send("Erro ao processar requisição!");
	}
  };

exports.login = async (req, res) => {
  try {
    let user = await User.findByEmail(req.body.email);

    if (user.length) {
      const samePass = await bcrypt.compare(
        req.body.password,
        user[0].password
      );

      if (samePass) {
        user = await User.findById(user[0].id);
        const authToken = generateAccessToken(user[0]);
        res.cookie("token", authToken, { httpOnly: true });
        res.send(authToken);
        return;
      }
    }

    res.status(400).send("Usuário ou senha inválidos");
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao processar requisição!");
  }
};


exports.changePassword = async (req, res) => {
	try {
		
		let user = await User.findByEmail(req.user.email);

		if (user.length) {
			const samePass = await bcrypt.compare(
				req.body.oldPassword,
				user[0].password
			);

			if (samePass) {
				
				const password = await encrypt(req.body.newPassword)
				await User.updatePassword(user[0].id, password)
				res.status(200).send({message: "Senha alterada com sucesso!"});
				return;
			}
		}

		res.status(400).send({message: "Senha incorreta!"});

	} catch (error) {
		console.log(error);
		res.status(500).send("Erro ao processar requisição!");
	}
};
