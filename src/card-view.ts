// ------------------------------------------------------------
// Card block
// ------------------------------------------------------------

export enum CardStyle {
	Folder, Note, Image,
}

export class CardBlock {
	style: string;
	col: number;
	cards: CardItem[];

	constructor() {
		this.style = 'cute';
		this.cards = [];
		this.col = -1;
	}

	addCard(card: CardItem) {
		this.cards.push(card);
	}

	clear() {
		this.cards = [];
	}

	getCardNum() {
		return this.cards.length;
	}

	getDocElement() {
		const cardDiv = document.createElement('div');
		if (this.style == 'cute') {
			cardDiv.addClass('cute-card-band');
			for (var i in this.cards) {
				cardDiv.appendChild(this.cards[i].getBoxElement())
			}
			if (this.col > 0) {
				cardDiv.setAttr('style' , 
				`grid-template-columns: repeat(${this.col}, 1fr);`);
			}
		}
		return cardDiv;
	}

    getHtmlCode() {
        var el = this.getDocElement();
        return el.innerHTML;
    }

	getYamlCode() {
		var yamlStr = '';
		const nCard = this.getCardNum();
		if (nCard > 0) {
			yamlStr = '\n```ccard\nstyle: cute\ncards: [';
			for (var i in this.cards) {
				yamlStr += '\n  {\n'
				yamlStr += this.cards[i].getYamlCode('    ');
				yamlStr += '  },'
			}
			// get rid of last period
			yamlStr = yamlStr.substring(0, yamlStr.length - 1);
			yamlStr += '\n]\n';
			if (this.col > 0) {
				yamlStr += `options: {\n  col: ${this.col}\n}\n`;
			}
			yamlStr += '```\n';
		}
		return yamlStr;
	}

	fromYamlCards(yaml: any) {
		if (yaml.type) {
			this.style = yaml.type;
		}
		if (yaml.cards) {
			this.clear();
			const cardsInfo = yaml.cards;
			for (var i in cardsInfo) {
				const cardInfo = cardsInfo[i];
				if ('title' in cardInfo) {
					let cardItem = new CardItem(cardInfo['title'], CardStyle.Note);
					cardItem.fromDict(cardInfo);
					this.addCard(cardItem);
				}
			}
		}
		if (yaml.options) {
			if (yaml.options.col) this.col = yaml.options.col;
		}

		return (this.getCardNum() > 0);
	}
}

export class CardItem {
	cardStyle: CardStyle;
	headText: string;
	headImage: string;
	title: string;
	titleLink: string;
	abstract: string;
	footnote: string;

	constructor(title: string, style: CardStyle) {
		this.title = title;
		this.abstract = "No abstract.";
		this.cardStyle = style;
	}

	setHeadText(text: string) {
		this.headText = text;
	}

	setHeadImage(linkUrl: string) {
		this.headImage = linkUrl;
	}

	setTitle(title: string) {
		this.title = title;
	}

	setTitleLink(linkUrl: string) {
		this.titleLink = linkUrl;
	}

	setAbstract(abstract: string) {
		this.abstract = abstract;
	}

	setFootnote(footnote: string) {
		this.footnote = footnote;
	}

	fromDict(dict: any) {
		if ('head' in dict) this.headText = dict['head'];
		if ('image' in dict) this.headImage = dict['image'];
		if ('link' in dict) this.titleLink = dict['link'];
		if ('brief' in dict) this.abstract = dict['brief'];
		if ('foot' in dict) this.footnote = dict['foot'];
	}

	getYamlCode(prefix: string) {
		var yamlStr = '';
		yamlStr += `${prefix}title: '${this.title}'`;
		if (this.headText) yamlStr += `,\n${prefix}head: '${this.headText}'`;
		if (this.titleLink) yamlStr += `,\n${prefix}link: '${this.titleLink}'`;
		if (this.headText) yamlStr += `,\n${prefix}head: '${this.headText}'`;
		if (this.headImage) yamlStr += `,\n${prefix}image: '${this.headImage}'`;
		if (this.abstract) yamlStr += `,\n${prefix}brief: '${this.abstract}'`;
		if (this.footnote) yamlStr += `,\n${prefix}foot: '${this.footnote}'`;
		yamlStr += '\n';
		return yamlStr;
	}

	getBoxElement() {
		var cardEl = document.createElement('div');
		cardEl.addClass('cute-card-view');
		// Heading
		let headEl = cardEl.appendChild(document.createElement('div'));
		if (this.headImage) {
			this.cardStyle = CardStyle.Image;
			if (this.headImage.startsWith("#")) {
				headEl.addClass('thumb-color');
				headEl.setAttr('style', `background-color: ${this.headImage};`);
			}
			else {
				headEl.addClass('thumb');
				headEl.setAttr('style', `background-image: url(${this.headImage});`);
			}
			if (this.headText) {
				headEl.textContent = this.headText;
			}
		}
		else if (this.cardStyle == CardStyle.Folder) {
			headEl.addClasses(['thumb-color', 'thumb-color-folder']);
			headEl.textContent = 'Folder';
		}
		else if (this.cardStyle == CardStyle.Note) {
			headEl.addClasses(['thumb-color', 'thumb-color-note']);
			headEl.textContent = 'Note';
		}
		// article
		let articleEl = cardEl.appendChild(document.createElement('article'));
		// Title
		if (this.titleLink) {
			let titleEl = articleEl.appendChild(document.createElement('a'));
			if (this.titleLink.endsWith('.md')) {
				titleEl.addClass('internal-link');
			}
			titleEl.href = this.titleLink;
			let h1El = document.createElement('h1');
			h1El.textContent = this.title;
			titleEl.appendChild(h1El);
		}
		else {
			let titleEl = articleEl.appendChild(document.createElement('h1'));
			titleEl.textContent = this.title;
		}
		// abstract
		let briefEl = articleEl.appendChild(document.createElement('p'));
		briefEl.textContent = this.abstract;
		// footnote
		if (this.footnote) {
			let footEl = articleEl.appendChild(document.createElement('span'));
			footEl.textContent = this.footnote;
		}
		// close
		return cardEl;
	}
}

