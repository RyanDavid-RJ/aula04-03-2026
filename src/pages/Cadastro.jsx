import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Cadastro() {
  const [loginDigitado, setLoginDigitado] = useState('');
  const [senhaDigitada, setSenhaDigitada] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const navigate = useNavigate();

  const validarLogin = (e) => {
    setLoginDigitado(e.target.value);
  };

  const validarSenha = (e) => {
    setSenhaDigitada(e.target.value);
  };

  const handleCadastroSubmit = async (e) => {
    e.preventDefault();
    setMensagemErro('');

    try {
      await fetch("http://localhost:3020/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({ login: loginDigitado, senha: senhaDigitada })
      });

      alert("Usuário cadastrado com sucesso!");
      navigate('/');
    } catch (erro) {
      console.error(erro);
      setMensagemErro('Erro de conexão com o banco de dados.');
    }
  };

  return (
    <>
      <h1>Cadastro</h1>

      <form onSubmit={handleCadastroSubmit}>
        <label htmlFor="login">Criar Login: </label>
        <input
          id="login"
          type="text"
          value={loginDigitado}
          onChange={validarLogin}
        />

        <label htmlFor="senha">Criar Senha: </label>
        <input
          id="senha"
          type="password"
          value={senhaDigitada}
          onChange={validarSenha}
        />

        <button type="submit">Cadastrar</button>
      </form>

      {mensagemErro && <p className="mensagemErro">{mensagemErro}</p>}

      <Link to="/">
        Já tem uma conta?
      </Link>
    </>
  );
}

export default Cadastro;