/**
 * @author Davi Wiliam <daviwil42@gmail.com>
 * @package jucescRequest
 */
 module.exports = new class jucescDOM {
    construct() {

        this.sq = '';
        this.nome = '';
        this.nire = '';
        this.cnpj = '';
        this.situacao = '';
        this.municipio = '';
    }

    /**
     * @param {String} sq
     * @returns {Self}
     */
    setSq(sq) {
        this.sq = sq;
        return this;
    }

    /**
     * @returns {String}
     */
    getSq() {
        return this.sq;
    }

    /**
     * @param {String} nome
     * @returns {Self}
     */
    setNome(nome) {
        this.nome = nome;
        return this;
    }

    /**
     * @returns {String}
     */
    getNome() {
        return this.nome;
    }

    /**
     * @param {String} nire
     * @returns {Self}
     */
    setNire(nire) {
        this.nire = nire;
        return this;
    }

    /**
     * @returns {String}
     */
    getNire() {
        return this.nire;
    }

    /**
     * @param {String} cnpj 
     * @returns {Self}
     */
    setCnpj(cnpj) {
        this.cnpj = cnpj;
        return this;
    }

    /**
     * @returns {String}
     */
    getCnpj() {
        return this.cnpj;
    }

    /**
     * 
     * @param {Param} situacao 
     * @returns {Self}
     */
    setSituacao(situacao) {
        this.situacao = situacao;
        return this;
    }

    /**
     * 
     * @returns {String}
     */
    getSituacao() {
        return this.situacao;
    }

    /**
     * @param {String} municipio 
     * @returns 
     */
    setMunicipio(municipio) {
        this.municipio = municipio;
        return this;
    }

    /**
     * @returns {String}
     */
    getMunicipio() {
        return this.municipio;
    }

}