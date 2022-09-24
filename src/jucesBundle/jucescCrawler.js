
/**
 * @author Davi Wiliam <daviwil42@gmail.com>
 * @package JucescCrawler
 */
module.exports = new class jucescCrawler {
    constructor() {
        this.requestPromise = require('request-promise');
        this.fs = require("fs");
        this.jucescRoutes = require('./Routes/jucescRoutes');
        this.jucescDOM = require('./DOM/jucescDOM');
        this.path = '../../fichas/';
    }

    /**
     * Pega a ficha cadastral simplicada e retorna convertida em base64
     * @param {string} cnpj 
     * @returns ficha
     */
    async mainApplication(cnpj) {
        try {

            this.response = await this.comunicaJucesc(this.jucescRoutes().url, cnpj);

            if (this.response && this.response.trim() == 'null') {

                this.msg = { 'msg': 'CNPJ ' + cnpj + ' - Não encontrado' };

                return this.msg;
            }

            this.data = await this.formatResponse(this.response);

            this.sq = this.data.sq;

            this.ficha = await this.downloadFicha(this.jucescRoutes().urlDownload, this.sq);

            if (!this.ficha) { throw 'CNPJ não retornou a ficha'; }

            this.armazenaFicha(cnpj, this.ficha);

            return this.data;

        } catch (err) {

            throw err;
        }
    }

    /**
     * Requisição para o site da jucesc
     * @param {string} url 
     * @param {string} cnpj 
     * @returns resposta da requisição
     */
    async comunicaJucesc(url, cnpj) {
        try {
            this.response = await this.requestPromise({
                url: url,
                method: 'POST',
                form: {
                    cnpj: cnpj
                }
            });

        } catch (err) {

            throw err;
        }

        return this.response
    }

    /**
    * Formata a resposta do site da jucesc
    * @param {Promise} response 
    * @returns {Promise} data
    */
    async formatResponse(response) {
        this.json = await response.trim();

        if (this.json) {

            this.obj = JSON.parse(this.json);
        } else {

            throw 'JSON undefined.';
        }

        this.obj.forEach(data => {
            this.data = data;
        });

        this.jucescDOM.setSq(this.data.SQ_PESSOA);
        this.jucescDOM.setNome(this.data.NO_PESSOA);
        this.jucescDOM.setNire(this.data.NR_NIRE);
        this.jucescDOM.setCnpj(this.data.NR_CGC);
        this.jucescDOM.setSituacao(this.data.DS_SITUACAO);
        this.jucescDOM.setMunicipio(this.data.NO_MUNICIPIO);

        return JSON.parse(JSON.stringify(this.jucescDOM));
    }

    /**
     * Download da ficha cadastral simplicada
     * @param {string} url 
     * @param {string} sq 
     * @returns {String}
     */
    async downloadFicha(url, sq) {
        try {
            this.ficha = await this.requestPromise({
                url: url + sq,
                method: 'POST',
            });

        } catch (err) {

            throw err;
        }

        return this.ficha
    }

    /**
    * Armazena a ficha em uma pasta
    * @param {string} cnpj
    * @param {string} ficha
    * @returns {File} 
    */
    async armazenaFicha(cnpj, ficha) {

        try {

            if (!this.fs.existsSync(this.path)) {
                this.fs.mkdirSync(this.path);
            }

            this.fs.writeFileSync(this.path + cnpj + '-ficha-simplificada.html', ficha);

        } catch (err) {

            throw 'Erro ao armazenar ficha';
        }
    }

}

//function p/ debug
async function mostrarDados() {

    const test = new JucescCrawler();
    const arrTest = ['17967523000104', '47621228000162', '82996703001905', '31098814000134', '83261420002950'];

    for (let i = 0; i < arrTest.length; i++) {

        console.log(await test.getFicha(arrTest[i]));

    }

}

mostrarDados();





