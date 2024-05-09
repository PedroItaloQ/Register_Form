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
  @media (max-width: 1000px) {
    display: none;
  }
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
  margin-bottom: 30px;
`;
const Form = styled.form`

`;

const FormContainer = styled.div` 

`;

const Title = styled.h1`
  color: #FFFFFF;
`;

const Label = styled.label`
  color: #98A2B3;
  font-size: 14px;
`;

const Input = styled.input`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 6px 15px;
  margin: 8px 0;
  width: 476px;
  height: 30px;
  background: #242424;
  border-radius: 10px;
  border: none;
  color: #FFFFFF;
  &::placeholder {
    color: #98A2B3; 
  }

  @media (max-width: 768px) {
    width: 400px;
    height: 26px;
    margin: 3px 0;
}
  
  @media (max-width: 450px) {
    width: 82vw;  
  }

`;

const Select = styled.select`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 10px;
  width: 506px;
  height: 43px;
  background: #242424;
  border-radius: 10px;
  border: none;
  & option:not([value=""]) {
    color: #FFFFFF;
}
  @media  (max-width: 768px) {
    width: 430px;
    height: 38px;
  }

  @media (max-width: 450px) {
    width: 89vw;
  }

`;

const Button = styled.button`
  background: #1570EF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 12px 20px;
  align-items: center;
  color: #FFFFFF;
  margin-top: 20px;
  font-size: 14px;
  width: 505px;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  border: none;

  @media (max-width: 768px) {
    width: 430px;
  }

  @media (max-width: 450px) {
    width: 89vw;
  }
  
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

  const handleChangeCPF = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container>
      <LeftContainer>
        <Image src="../../Frame 135.png" alt="Imagem" />
      </LeftContainer>
      <RightContainer>
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <Title>Cadastro</Title>
            <Label>Nº do CPF*</Label>
            <Input placeholder="000.000.000-00" required type="text" name="cpf" maxLength={14} minLength={14} value={data.cpf} onChange={handleChangeCPF} />
            <Label>Nome*</Label>
            <Input type="text" name="first_name" required value={data.first_name} onChange={handleChange} />
            <Label>Sobrenome*</Label>
            <Input type="text" required name="last_name" value={data.last_name} onChange={handleChange} />
            <Label>E-mail*</Label>
            <Input placeholder="example@example.com" required type="email" name="email" value={data.email} onChange={handleChange} />
            <Label>Senha*</Label>
            <Input type="password" required name="password" value={data.password} onChange={handleChange} />
            <Label>Confirmar Senha*</Label>
            <Input type="password" name="password2" required value={data.password2} onChange={handleChange} />
            <Label>Tipo De Triagem*</Label>
            <Select name='type_of_triage' required id="type_of_triage" value={data.triage_of_type} onChange={handleChange}>
              <option value="" ></option>
              <option value="Ceara">Ceará</option>
              <option value="SaoPaulo">São Paulo</option>
              <option value="RioDeJaneiro">Rio de Janeiro</option>
            </Select>
            <Button type="submit">Cadastrar</Button>
          </Form>
        </FormContainer>
      </RightContainer>
    </Container>
  );
};

export default dynamic(() => Promise.resolve(UserCreate), { ssr: false });
