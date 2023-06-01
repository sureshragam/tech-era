import styled from 'styled-components'

export const TechDetailsContainer = styled.div`
  height: 100vh;
`
export const TechDetailsContentContainer = styled.div`
  width: 70%;
  margin: auto;
  display: flex;
  gap: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0.5px 0.5px 12px 0.5px #64748b;
  margin-top: 100px;
`
export const Image = styled.img`
  width: 25%;
`
export const Content = styled.div`
  padding: 10px 20px;
`
export const Name = styled.h1`
  color: #1e293b;
  font-size: 35px;
`
export const Description = styled.p`
  color: #475569;
  font-size: 20px;
`
export const LoaderContainer = styled.div`
  width: 80%;
  margin: auto;
  text-align: center;
`
export const FailureViewContainer = styled.div`
  width: 80%;
  margin: auto;
  text-align: center;
`
export const FailureImage = styled.img`
  width: 40%;
`
export const RetryButton = styled.button`
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  outline: none;
  background-color: #4656a1;
  border-style: none;
  width: 130px;
`
