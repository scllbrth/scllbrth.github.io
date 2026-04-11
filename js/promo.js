let dataArr = [];

const getData = async () => {
    try {
        const res = await fetch('../data/MOCK_DATA.json');
        const data = await res.json();
        console.log(data);

        showData(data);
    } catch (err) {
        console.log(err);
    }
}

const showData = (data) => {
    dataArr = data;
    dataArr.forEach((data) => {
        // console.log(data);

        if ('content' in document.createElement('template')) {
            const items = document.querySelector('.products-row-items');
            const template = document.querySelector('#template');

            const clone = document.importNode(template.content, true);
            clone.querySelector('.item-name').textContent = data['name'];
            clone.querySelector('.item-price').textContent = `$${data['price']}`;
            clone.querySelector('img').src = `./images/${data['id']}.jpg`;
            clone.querySelector('.products-row-item').id = data.id;
            
            items.appendChild(clone);
        } else {
            return;
        }
    })
}

getData();