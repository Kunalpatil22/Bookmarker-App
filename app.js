// Bookmark class

class Bookmark {
	constructor(name, url) {
		this.name = name;
		this.url = url;
	}
}

// Storage class

class Storage {
	static getBookmarkFromStorage() {
		let bookmarkList;
		if (localStorage.getItem('bookmarks') === null) {
			bookmarkList = [];
		} else {
			bookmarkList = JSON.parse(localStorage.getItem('bookmarks'));
		}
		return bookmarkList;
	}

	static addBookmarkToStorage(bookmark) {
		const bookmarkList = Storage.getBookmarkFromStorage('bookmarks');
		bookmarkList.push(bookmark);

		localStorage.setItem('bookmarks', JSON.stringify(bookmarkList));
	}

	static removeBookmarkFromStorage(target) {
		const bookmarkList = Storage.getBookmarkFromStorage('bookmarks');

		if ((target.classList.contais = 'delete')) {
			const key = target.parentElement.previousElementSibling.innerText;

			bookmarkList.forEach((bookmark, index) => {
				if (bookmark.name === key) {
					bookmarkList.splice(index, 1);
				}

				localStorage.setItem('bookmarks', JSON.stringify(bookmarkList));
			});
		}
	}
}

// UI class

class UI {
	static displayBookmarks() {
		const bookmarks = Storage.getBookmarkFromStorage();

		bookmarks.forEach((bookmark) => {
			UI.addBookmarkToUI(bookmark);
		});
	}

	static addBookmarkToUI(bookmark) {
		const list = document.getElementById('bookmark-list');
		const li = document.createElement('li');

		li.innerHTML = `
            <a href=https://www.${bookmark.url}>${bookmark.name}</a>
            <a><i class="fas fa-trash delete"></i></a>
            `;

		li.className = 'list-group';

		list.appendChild(li);
	}

	static removeBookmarkFromUI(target) {
		if (target.classList.contains('delete')) {
			target.parentElement.parentElement.remove();
		}
	}

	static clearfields() {
		document.getElementById('name').value = '';
		document.getElementById('url').value = '';
	}
}

// Display bookmarks

document.addEventListener('DOMContentLoaded', (e) => UI.displayBookmarks());

// Event to submit

document.getElementById('input-form').addEventListener('submit', (e) => {
	e.preventDefault();

	const name = document.getElementById('name').value;
	const url = document.getElementById('url').value;

	if (name === '' || url === '') {
		alert('Enter all fields');
	} else {
		const bookmark = new Bookmark(name, url);

		UI.addBookmarkToUI(bookmark);

		Storage.addBookmarkToStorage(bookmark);
	}

	UI.clearfields();
});

// Event to remove

document.getElementById('bookmark-list').addEventListener('click', (e) => {
	UI.removeBookmarkFromUI(e.target);
	Storage.removeBookmarkFromStorage(e.target);
});
