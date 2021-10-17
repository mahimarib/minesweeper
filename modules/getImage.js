function getImage(path) {
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', path);
    imgElement.setAttribute('draggable', false);
    return imgElement;
}

export default getImage;
