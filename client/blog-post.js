class Post extends HTMLElement {
    constructor(a, b) {
        console.log(a, b);
        super();
    }

    properties = {
        title: "",
        summary: "",
    };

    static observedAttributes = ["title", "summary"];

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(propertyName, _oldValue, newValue) {
        this.properties[propertyName] = newValue;
        this.render();
    }

    render() {
        this.innerHTML = `
            <h1>${this.properties.title}</h1>
            <p>${this.properties.summary}</p>
        `;
    }
}

customElements.define("blog-post", Post);
