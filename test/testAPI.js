const assert = require("assert").strict;
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:4000/juego';


const palabraAAdivinar = "xyz";

describe("Test API del juego", () => {
  it("validar ruta de instanciacion de un nuevo juego", (done) => {
    chai.request(url)
      .post('/iniciarNuevaPartida')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id').to.not.be.equal(undefined);
        done();
      });
  });
  
  it("validar ruta para definir una palabra a adivinar", (done) => {
    chai.request(url)
      .post('/definirPalabraAAdivinar')
      .send({ palabraAAdivinar })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('palabraAAdivinar').to.be.equal(palabraAAdivinar);
        done();
      });
  });

  it("validar ruta de arriesgar una letra", (done) => {
    chai.request(url)
      .post('/arriesgarLetra')
      .send({ letra: 'x' })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('letrasAcertadas').to.not.be.equal(undefined);
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
      .send({ palabra: palabraAAdivinar })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('letrasAcertadas').to.not.be.equal(undefined);
        done();
      });
  });
});
