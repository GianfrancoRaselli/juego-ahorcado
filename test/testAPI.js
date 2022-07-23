const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const dotenv = require('dotenv');
dotenv.config();

const url = 'http://localhost:' + process.env.PORT + '/juego';

const palabraAAdivinar = { palabra: "xyz"};

describe("Test API del juego", () => {
  it("validar ruta de instanciacion de un nuevo juego", (done) => {
    chai.request(url)
      .post('/iniciarNuevaPartida')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('erroresPermitidos').to.be.equal(6);
        done();
      });
  });
  
  it("validar ruta para definir una palabra a adivinar", (done) => {
    chai.request(url)
      .post('/definirPalabraAAdivinar')
      .send( { palabra : palabraAAdivinar.palabra } )
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('palabraAAdivinar').to.be.equal(palabraAAdivinar.palabra);
        done();
      });
  });

  it("validar ruta de arriesgar una letra", (done) => {
    chai.request(url)
      .post('/arriesgarLetra')
      .send({ letra: "y" })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('letrasAcertadas').deep.to.equal([null, 'y', null]);
        done();
      });
  });

  it("validar ruta de obtener las letras acertadas hasta el momento", (done) => {
    chai.request(url)
      .get('/letrasAcertadas')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('letrasAcertadas').to.not.be.equal(undefined);
        done();
      });
  });

  it("validar ruta de arriesgar una palabra", (done) => {
    chai.request(url)
      .post('/arriesgarPalabra')
      .send({ palabra: palabraAAdivinar.palabra })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('letrasAcertadas').deep.to.equal(['x', 'y', 'z']);
        done();
      });
  });
});
