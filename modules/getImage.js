function getImage(path) {
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', path);
    return imgElement;
}

export default getImage;
