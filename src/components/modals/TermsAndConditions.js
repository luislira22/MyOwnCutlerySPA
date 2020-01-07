import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, Button, Modal, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

const TermsAndCondtions = (props) => {

    return (
        <Modal
            {...props.parent}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3>Termos e condições</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Responsável pelo tratamento de dados</h5>
                <p>A entidade responsável pela recolha e tratamento dos dados pessoais de todos os utilizadores, qual o
                    tratamento dos mesmos e as finalidades para que são utilizados é a MyOwnCutlery Lda., contribuinte
                    no 112092980, R. Dr. António Bernardino de Almeida 451 Edifício B, 4200-072 Porto, telefone:
                    +551 22 456 2790, email: geral@myowncutlery.isep.ipp.pt.</p>
                <br />
                <h5>Dados a serem recolhidos e finalidade</h5>
                <p>Os dados a serem recolhidos serão o nome próprio e apelidado do cliente, endereço de email, número de
                    contribuinte (NIF). Estes dados serão utilizados para:</p>
                <ul>
                    <li>efeito de registo no website e autenticação no mesmo</li>
                    <li>fornecimento de apoio ao cliente</li>
                    <li>possibilitar o cumprimento do contrato e entregar as encomendas</li>
                    <li>permitir a faturação das encomendas para efeito legais</li>
                </ul>
                <br />
                <h5>Fundamento da recolha dos dados</h5>
                <p>O fundamento jurídico para o tratamento de dados como o nome próprio e apelido nome, endereço de
                    email e password é o consentimento do utilizador, que depende de um ato positivo claro, corporizador
                    de uma manifestação de vontade que se quer livre, específica, informada e inequívoca.</p>
                <p>No tratamento do número de identificação fiscal e da morada têm-se como fundamento jurídico a
                    necessidade destes dados para o cumprimento de um contrato em que o titular dos dados (o cliente)
                    é parte.</p>
                <br />
                <h5>Prazo de conservação</h5>
                <p>Para as finalidades descritas nesta política de privacidade, os dados pessoais do consumidor serão
                    conservados até ao prazo máximo de 12 meses, contados a partir da última utilização dos serviços
                    da MyOwnCutlery Lda. e caso dentro deste período, o mesmo não tenha revogado o consentimento.</p>
                <br />
                <h5>Direitos</h5>
                <p>Todos os consumidores dos serviços da MyOwnCutlery Lda. têm o direito de:</p>
                <ul>
                    <li>A solicitar o acesso a toda a informação armazenada sobre si, através do website</li>
                    <li>A solicitar a retificação de dados caso estes estejam incorretos ou incompletos</li>
                    <li>A solicitar o apagamento ou a limitação do tratamento dos seus dados pessoais</li>
                    <li>A opor-se ao tratamento dos seus dados pessoais</li>
                    <li>À portabilidade dos seus dados pessoais</li>
                    <li> À apresentação de uma reclamação à Comissão Nacional de Proteção de Dados.</li>
                </ul>
                <br />
                <h5>Apagamento de dados</h5>
                <p>Ao solicitar o apagamento dos seus dados estes serão imediatamente apagados com a exceção do NIF no
                    caso da existência de pagamentos em falta, caso esse em que os dados serão mantidos até ao
                    cumprimento do contrato.</p>
                <br />
                <h5>Falta de consenso</h5>
                <p>Ao recusar o tratamento dos seus dados abdica de todas as vantagens associadas à aquisição de uma
                    conta pessoal no website oficial da empresa MyOwnCutlery Lda., nomeadamente a realização de
                    encomendas e a entrega das mesmas ao domicílio.</p>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary">Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TermsAndCondtions;