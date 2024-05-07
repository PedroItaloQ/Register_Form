import React from "react";
import styled from "styled-components";
import { useState } from "react";
import postData from "@/api/postData";
import { UserCredentials } from "../interfaces/userCredentials";
import dynamic from "next/dynamic";

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const LeftContainer = styled.div`
  flex: 1;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  gap: 10px;
`;

const Title = styled.h1`
  color: #FFFFFF;
`;

const Label = styled.label`
  color: #98A2B3;
  font-size: 14px;
  line-height: 130%;
`;

const Input = styled.input`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: 12px 20px;
gap: 10px;

width: 476px;
height: 44px;

background: #242424;
border-radius: 10px;
`;

const Select = styled.select`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: 12px 20px;
gap: 10px;

width: 476px;
height: 44px;

background: #242424;
border-radius: 10px;
`;

const Button = styled.button`
  wid
`;

const UserCreate: React.FC = () => {
    const [data, setData] = useState<UserCredentials>({
        cpf: "",
        first_name: "",
        last_name: "",
        email: "",
        triage_of_type: "",
        password: "",
        password2: "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await postData(data);
            alert("Usuário criado com sucesso!");
            console.log(response.data);
        } catch (error) {
            console.error('Erro ao criar usuário.', error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div>
            <div>
                <Image src="../../Frame 135.png" alt="Imagem" />
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>CPF:</label>
                    <input type="text" name="cpf" value={data.cpf} onChange={handleChange} />
                    <label>Nome:</label>
                    <input type="text" name="first_name" value={data.first_name} onChange={handleChange} />
                    <label>Sobrenome:</label>
                    <input type="text" name="last_name" value={data.last_name} onChange={handleChange} />
                    <label>E-mail</label>
                    <input type="email" name="email" value={data.email} onChange={handleChange} />
                    <label>Tipo De Triagem:</label>
                    <select name='type_of_triage' id="type_of_triage" value={data.triage_of_type} onChange={handleChange}>
                        <option value="" ></option>
                        <option value="Ceara">Ceará</option>
                        <option value="SaoPaulo">São Paulo</option>
                        <option value="RioDeJaneiro">Rio de Janeiro</option>
                    </select>
                    <label>Senha:</label>
                    <input type="password" name="password" value={data.password} onChange={handleChange} />
                    <label>Confirmar Senha:</label>
                    <input type="password" name="password2" value={data.password2} onChange={handleChange} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(UserCreate), { ssr: false });
