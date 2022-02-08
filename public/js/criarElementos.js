const addImg = document.querySelector('#addImg');
const addParg = document.querySelector('#addParg');
const addCod = document.querySelector('#addCod');
const addVideo = document.querySelector('#addVideo');
const addSubTopic = document.querySelector('#addSubTopic');

let id = 0;
let idImg = 0;
let idParg = 0;
let idCod = 0;
let idVideo = 0;
let idSubTopic = 0;

const divAdd = document.getElementById('toAdd');

// label2.className = 'form-label'
// input1.className = 'form-control';

// classList.add('form-control', 'd-none');
// classList.add('form-label', 'd-none');

addImg.addEventListener('click', () => {
    idImg = idImg + 1;
    id = id + 1;

    const subTitle = document.createElement('h5');
    const text = document.createTextNode(`Imagem ${idImg}:`);
    subTitle.appendChild(text);

    divAdd.appendChild(subTitle);

    //----------------------------------------------------------------------
    const label1 = document.createElement('label');
    label1.htmlFor = `img${idImg}Src`;
    label1.className = 'form-label'

    const text1 = document.createTextNode(`Fonte para Imagem ${idImg}:`);
    label1.appendChild(text1);

    const input1 = document.createElement('input');
    input1.type = 'text';
    input1.id = label1.htmlFor;
    input1.name = label1.htmlFor;
    input1.className = 'form-control';

    //-----------------------------------------------------------------------
    const label2 = document.createElement('label');
    label2.htmlFor = `img${idImg}Alt`;
    label2.className = 'form-label'

    const text2 = document.createTextNode(`Texto alternativo para Imagem ${idImg}:`);
    label2.appendChild(text2);
    
    const input2 = document.createElement('input');
    input2.type = 'text'
    input2.id = label2.htmlFor;
    input2.name = label2.htmlFor;
    input2.style.marginBottom = '1.5rem'
    input2.className = 'form-control';

    // -------------------------------------------------------------------------
    const text0 = document.createTextNode('Tipo de elemento HTLM:');

    const label0 = document.createElement('label');
    label0.htmlFor = `element${id}`;
    label0.classList.add('form-label', 'd-none');
    label0.appendChild(text0)

    const input0 = document.createElement('input');
    input0.type = 'text';
    input0.id = label0.htmlFor;
    input0.name = label0.htmlFor;
    input0.value = 'img';
    input0.classList.add('form-control', 'd-none');

    //--------------------------------------------------------------------------
    divAdd.appendChild(label0);
    divAdd.appendChild(input0);
    divAdd.appendChild(label1);
    divAdd.appendChild(input1);
    divAdd.appendChild(label2);
    divAdd.appendChild(input2);
})
    
addParg.addEventListener('click', () => {
    id = id + 1;
    idParg = idParg + 1;

    const subTitle = document.createElement('h5');
    const text1 = document.createTextNode(`Paragráfo ${idParg}:`);
    subTitle.appendChild(text1);

    //------------------------------------------------
    const label = document.createElement('label');
    label.htmlFor = `parg${idParg}`;
    label.className = 'form-label'

    const text2 = document.createTextNode(`Texto para o paragráfo ${idParg}:`);
    label.appendChild(text2);

    //----------------------------------------------
    const textArea = document.createElement('textarea');
    textArea.id = label.htmlFor;
    textArea.name = label.htmlFor;
    textArea.style.marginBottom = '1.5rem'
    textArea.className = 'form-control'

    // -------------------------------------------------------------------------
    const text0 = document.createTextNode('Tipo de elemento HTLM:');

    const label0 = document.createElement('label');
    label0.classList.add('form-label', 'd-none');
    label0.htmlFor = `element${id}`;
    label0.appendChild(text0);

    const input0 = document.createElement('input');
    input0.type = 'text';
    input0.id = label0.htmlFor;
    input0.name = label0.htmlFor;
    input0.value = 'p';
    input0.classList.add('form-label', 'd-none');

    //--------------------------------------------------------------------------
    divAdd.appendChild(subTitle);
    divAdd.appendChild(label0);
    divAdd.appendChild(input0);
    divAdd.appendChild(label);
    divAdd.appendChild(textArea);

})
    
addCod.addEventListener('click', () => {
    idCod = idCod + 1;
    id = id + 1;

    const subTitle = document.createElement('h5');
    const text1 = document.createTextNode(`Código ${idCod}:`);
    subTitle.appendChild(text1);

    //------------------------------------------------
    const label = document.createElement('label');
    label.htmlFor = `cod${idCod}`;
    label.className = 'form-label';

    const text2 = document.createTextNode(`Adicione o código ${idCod}:`);
    label.appendChild(text2);

    //----------------------------------------------
    const textArea = document.createElement('textarea');
    textArea.id = label.htmlFor;
    textArea.name = label.htmlFor;
    textArea.className = 'form-control';
    textArea.style.marginBottom = '1.5rem'

    // -------------------------------------------------------------------------
    const text0 = document.createTextNode('Tipo de elemento HTLM:');

    const label0 = document.createElement('label');
    label0.htmlFor = `element${id}`;
    label0.classList.add('form-label', 'd-none');
    label0.appendChild(text0)

    const input0 = document.createElement('input');
    input0.type = 'text';
    input0.id = label0.htmlFor;
    input0.name = label0.htmlFor;
    input0.classList.add('form-control', 'd-none');
    input0.value = 'pre';

    //--------------------------------------------------------------------------
    divAdd.appendChild(subTitle);
    divAdd.appendChild(label0);
    divAdd.appendChild(input0);
    divAdd.appendChild(label);
    divAdd.appendChild(textArea)
})
    
addVideo.addEventListener('click', () => {
    idVideo = idVideo + 1;
    id = id + 1;

    const subTitle = document.createElement('h5');
    const text1 = document.createTextNode(`Vídeo ${idVideo}:`);
    subTitle.appendChild(text1);

    //------------------------------------------------
    const label = document.createElement('label');
    label.htmlFor = `video${idVideo}`;
    label.className = 'form-label';

    const text2 = document.createTextNode(`Adicione o link do vídeo ${idVideo}:`);
    label.appendChild(text2);

    //----------------------------------------------
    const input = document.createElement('input');
    input.id = label.htmlFor;
    input.name = label.htmlFor;
    input.className = 'form-control';
    input.style.marginBottom = '1.5rem'

    // -------------------------------------------------------------------------
    const text0 = document.createTextNode('Tipo de elemento HTLM:');

    const label0 = document.createElement('label');
    label0.htmlFor = `element${id}`;
    label0.classList.add('form-label', 'd-none');
    label0.appendChild(text0)

    const input0 = document.createElement('input');
    input0.type = 'text';
    input0.id = label0.htmlFor;
    input0.name = label0.htmlFor;
    input0.classList.add('form-control', 'd-none');
    input0.value = 'iframe';

    //--------------------------------------------------------------------------
    divAdd.appendChild(subTitle);
    divAdd.appendChild(label0);
    divAdd.appendChild(input0);
    divAdd.appendChild(label);
    divAdd.appendChild(input)
})

addSubTopic.addEventListener('click', () => {
    idSubTopic = idSubTopic + 1;
    id = id + 1;

    const subTitle = document.createElement('h5');
    const text1 = document.createTextNode(`Subtópico ${idSubTopic}:`);
    subTitle.appendChild(text1);

    //------------------------------------------------
    const label = document.createElement('label');
    label.htmlFor = `subTopic${idSubTopic}`;
    label.className = 'form-label';

    const text2 = document.createTextNode(`Adicione o texto o do subtópico ${idSubTopic}:`);
    label.appendChild(text2);

    //----------------------------------------------
    const input = document.createElement('input');
    input.id = label.htmlFor;
    input.name = label.htmlFor;
    input.className = 'form-control';
    input.style.marginBottom = '1.5rem';

    // -------------------------------------------------------------------------
    const text0 = document.createTextNode('Tipo de elemento HTLM:');

    const label0 = document.createElement('label');
    label0.htmlFor = `element${id}`;
    label0.classList.add('form-label', 'd-none');
    label0.appendChild(text0)

    const input0 = document.createElement('input');
    input0.type = 'text';
    input0.id = label0.htmlFor;
    input0.name = label0.htmlFor;
    input0.classList.add('form-control', 'd-none');
    input0.value = 'h4';

    //--------------------------------------------------------------------------
    divAdd.appendChild(subTitle);
    divAdd.appendChild(label0);
    divAdd.appendChild(input0);
    divAdd.appendChild(label);
    divAdd.appendChild(input);
})