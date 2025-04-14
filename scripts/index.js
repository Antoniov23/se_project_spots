const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const cardsList = document.querySelector(".cards__list");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.forms["cardForm"];
const addCardButton = document.querySelector(".profile__add-button");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseButton = previewModal.querySelector(".modal__close-btn");
previewModalCloseButton.addEventListener("click", () =>
  closeModal(previewModal)
);

const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editModal = document.querySelector("#edit-profile-modal");
const editFormElement = document.querySelector(".modal__form");
const editModalClosebutton = document.querySelector(".modal__close-btn");
const editModalNameInput = document.querySelector("#profile-name-input");
const editModalDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardButtonEl = cardElement.querySelector(".card__like-button");

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardImageEl.addEventListener("click", () => {
    const previewModal = document.querySelector("#preview-modal");
    const previewImage = previewModal.querySelector(".modal__image");
    const previewTitle = previewModal.querySelector(".modal__heading");

    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewTitle.textContent = data.name;

    openModal(previewModal);
  });

  const CardLikeBtnEl = cardElement.querySelector(".card__like-button");
  CardLikeBtnEl.addEventListener("click", () => {
    CardLikeBtnEl.classList.toggle("card__like-button_active");
  });

  const CardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
  CardDeleteBtnEl.addEventListener("click", () => {
    CardDeleteBtnEl.closest(".card").remove();
  });

  return cardElement;
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  if (modal === editModal) {
    editModalNameInput.value = profileName.textContent;
    editModalDescriptionInput.value = profileDescription.textContent;
  }
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
}

profileEditButton.addEventListener("click", () => openModal(editModal));
editModalClosebutton.addEventListener("click", () => closeModal(editModal));
editFormElement.addEventListener("submit", handleEditFormSubmit);
addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = addCardForm.querySelector("#card-title-input").value;
  const imageUrl = addCardForm.querySelector("#card-url-input").value;
  console.log("Form submitted", { title, imageUrl });
  const newCard = {
    name: title,
    link: imageUrl,
  };

  renderCard(newCard);

  closeModal(addCardModal);
  addCardForm.reset();
});

const addCardModalCloseButton = addCardModal.querySelector(".modal__close-btn");
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.append(cardElement);
});
