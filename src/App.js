import "./App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Card } from "./components/Card";
import { useState } from "react";
function App() {
  const formSchema = yup.object().shape({
    user: yup.string().required("Usuário obrigatório"),
    name: yup.string().required("Nome obrigatório").max(18),
    address: yup.string().required("Endereço obrigatório"),
    cellphone: yup.string().required("Celular obrigatório"),
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    confirm_email: yup
      .string()
      .required("Email obrigatório")
      .email("Email inválido")
      .oneOf([yup.ref("email"), null], "Email está diferente do anterior"),
    password: yup.string().required("Senha obrigatória"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Senha diferente da anterior"),
    use_terms: yup
      .string()
      .required("Você deve concordar com os termos de uso"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const [data, setData] = useState("");

  console.log(data);

  const onSubmitFunction = (data) => setData(data);

  return (
    <div className="App">
      <div className="container">
        <form className="form" onSubmit={handleSubmit(onSubmitFunction)}>
          <input placeholder="Usuário" {...register("user")} />
          <div class="message">{errors.user?.message}</div>
          <input placeholder="Nome completo" {...register("name")} />
          <div class="message">{errors.name?.message}</div>
          <input placeholder="Endereço" {...register("address")} />
          <div class="message">{errors.address?.message}</div>
          <input placeholder="Celular" {...register("cellphone")} />
          <div class="message">{errors.cellphone?.message}</div>
          <input placeholder="Endereço de Email" {...register("email")} />
          <div class="message">{errors.email?.message}</div>
          <input
            placeholder="Confirme seu Email"
            {...register("confirm_email")}
          />
          <div class="message">{errors.confirm_email?.message}</div>
          <div className="password">
            <input
              placeholder="Senha"
              type="password"
              {...register("password")}
            />
            <input placeholder="Confirme sua senha" type="password" {...register("confirm_password")} />
          </div>
            <div class="message">{errors.password?.message}</div>
            <div class="message">{errors.confirm_password?.message}</div>
          <div className="termos-uso">
            <input
              id="terms"
              type="checkbox"
              checked
              {...register("use_terms")}
            />
            <label for="terms">Eu aceito os termos de uso da aplicação</label>
          </div>
          <button type="submit">CADASTRAR</button>
          <span>
            <a href="/">Já possui uma conta?</a>
          </span>
        </form>
        {data !== "" && <Card data={data} />}
      </div>
    </div>
  );
}

export default App;
