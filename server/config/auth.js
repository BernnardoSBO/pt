
// import de biblioteca passport
const passport = require('passport');
// import das classes de cada uma das estratégias utilizadas
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;

// import do modelo de usuários
const User = require('../users/model/User');


// registrar as estratégias que iremos utilizar do passport
passport.use(
  // 1° parametro: nome da estrategia
  'login',
  // 2° parametro: instanciação da classe da estratégia que utilizaremos
  // obs: classe importada
  new LocalStrategy(
    // 1° parametro da instancia: objeto contendo quais credenciais avaliaremos
    {
      usernameField: 'email',
      passwordField: 'password',
      // ja que não utilizaremos sessoes, uma vez que utilizaremos o JSON
      // webtool, declaramos session como false
      session: false,
    },
    // 2° parametro da instancia: função que será executada nos parametros
    //  passados no primeiro parametro afim de definir a autenticação do usuário
    // _
    // obs: como consultaremos o banco de dados, utilizaremos uma função
    // asincrona
    // _
    // obs2; o terceiro parametro dessa função de callback é uma função de
    // callback da biblioteca do password que indica se o usuario deve ou
    // nao ser autenticado
    async (email, password, done) => {
      try {
        const user = await User.findOne({
          where: {email: email},
        });

        if (!user) {
          throw new Error('Email e/ou senha incorreto(s)');
        }

        const matchingPassword = (password === user.password);

        if (!matchingPassword) {
          throw new Error('Email e/ou senha incorreto(s)');
        }

        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error, false);
      }
    },
  ),
);

// criamos uma função afim de extrair o jwt dos cookies para autenticação
const cookieExtractor = (req) => {
  let token = null;
  // se tivermos uma requisição sem cookies o valor retornado sera nulo
  // se nao tivermos uma requisição, nao temos como autorizar o acesso
  if (req && req.cookies) {
    // se temos a requisição e os cookies, tentamos atribuir a chave
    // token = cookie com indice jwt. caso nao exista, o valor sera nulo
    token = req.cookies['jwt'];
  }

  return token;
};

passport.use(
  // definição de estratégia para uso de JWT AUTH
  new JwtStrategy(
    // 1° PARAMETRO: objeto contendo infos sobre o jwt extraidos
    {     
      secretOrKey: process.env.SECRET_KEY,   // secret key que utilizaremos para gera-lo mais tarde
      jwtFromRequest: cookieExtractor,       // definição de qual metodo usaremos para pegar o jwt da request o parametro é como extraimos esse jwt
    },
    // 2° PARAMETRO: função de verificação dos parametros extraidos
    async (jwtPayload, done) => {            // jwtPayload: obj contendo o payload
      try {                                  // done: é uma callback de erro do passport que aceita parametros: done(error, user, info)
        return done(null, jwtPayload.user);  // I  ----  tenta retornar jwtPayload.user caso ele exista
      } catch (error) {                      // II ----  caso o jwtPayload.user nao exista, retorna done com 
        return done(error, false);           //          os parametros done(error,false)
      }
    },
  ),
);
