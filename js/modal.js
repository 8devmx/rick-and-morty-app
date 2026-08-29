const modal = document.querySelector('#error-modal')
const modalMessage = document.querySelector('#error-modal-message')
const modalClose = document.querySelector('#error-modal-close')

modalClose.addEventListener('click', function () {
  modal.hidden = true
})

export function showModal (message) {
  modalMessage.textContent = message
  modal.hidden = false
}


const detailModal = document.querySelector('#detail-modal')
const detailModalContent = document.querySelector('#detail-modal-content')
const detailModalClose = document.querySelector('#detail-modal-close')


detailModalClose.addEventListener('click', function () {
  detailModal.hidden = true
})

detailModal.addEventListener('click', function (e) {
  if (e.target === detailModal) {
    detailModal.hidden = true
  }
})

export function showDetailModal (html) {
  detailModalContent.innerHTML = html
  detailModal.hidden = false
}

export function hideDetailModal () {
  detailModal.hidden = true
}

export function onEpisodeChipClick (handler) {
  detailModal.addEventListener('click', function (e) {
    const chip = e.target.closest('.episode_chip')
    if (chip) handler(Number(chip.dataset.episodeId))
  })
}
