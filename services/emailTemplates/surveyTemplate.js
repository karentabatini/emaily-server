const keys = require('../../config/keys');

module.exports = (survey) => {
    return `
    <html>
        <div style="text-align: center;">
        <h3>Adoraria saber a sua resposta!</h3>
        <p>Por favor, responda a questão abaixo:</p>
        <p>${survey.body}</p>
        <div>
            <a href="${keys.redirectDomain}/api/surveys/thanks">Sim</a>
        </div>
        <div>
            <a href="${keys.redirectDomain}/api/surveys/thanks">Não</a>
        </div>
        </div>
    </html>
    `;
}