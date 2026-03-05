import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './Login.css';

function Login() {
  const [loginDigitado, setLoginDigitado] = useState('');
  const [senhaDigitada, setSenhaDigitada] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const navigate = useNavigate(); // <=== enter depois o navigate

  const validarLogin = (e) => {
    setLoginDigitado(e.target.value);
  };

  const validarSenha = (e) => {
    setSenhaDigitada(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMensagemErro('');
    if (loginDigitado === '' || senhaDigitada === '') {
      setMensagemErro('Por favor, preencha todos os campos!');
      return; // 
    }
    try {
      const resposta = await fetch('http://localhost:3020/usuario');
      // ... (o resto continua igual)
      const listaDeUsuarios = await resposta.json();

      const usuarioEncontrado = listaDeUsuarios.find(
        (user) => user.login === loginDigitado && user.senha === senhaDigitada
      );

      if (usuarioEncontrado) {
        navigate('/home');
      } else {
        setMensagemErro('Login ou senha incorretos!');
      }
    } catch (erro) {
      console.error(erro);
      setMensagemErro('Erro de conexão com o banco de dados.');
    }
  };

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="login">Login: </label>

        <input
          id="login"
          type="text"
          value={loginDigitado}
          onChange={validarLogin}
        />

        <label htmlFor="senha">Senha: </label>
        <input
          id="senha"
          type="password"
          value={senhaDigitada}
          onChange={validarSenha}
        />

        <button type="submit">Entrar</button>
      </form>

      {mensagemErro && <p className="mensagemErro">{mensagemErro}</p>}

      <Link to="/cadastro">
        Não tem uma conta? Cadastre-se
      </Link>
    </>
  );
}

export default Login;