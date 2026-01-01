'use client';

import { useEffect } from 'react';

export default function ImageGalleryModal() {
	useEffect(() => {
		// Create modal container
		const modal = document.createElement('div');
		modal.id = 'image-gallery-modal';
		modal.className = 'fixed inset-0 z-[9999] hidden items-center justify-center bg-black/95 p-4';
		modal.style.cursor = 'zoom-out';
		
		const modalContent = document.createElement('div');
		modalContent.className = 'relative max-w-[95vw] max-h-[95vh] flex items-center justify-center';
		
		const modalImage = document.createElement('img');
		modalImage.id = 'modal-image';
		modalImage.className = 'max-w-full max-h-[95vh] object-contain';
		modalImage.style.cursor = 'zoom-out';
		
		modalContent.appendChild(modalImage);
		modal.appendChild(modalContent);
		document.body.appendChild(modal);

		// Close modal function
		const closeModal = () => {
			modal.classList.add('hidden');
			modal.classList.remove('flex');
			document.body.style.overflow = '';
		};

		// Open modal function
		const openModal = (src: string, alt: string) => {
			modalImage.src = src;
			modalImage.alt = alt;
			modal.classList.remove('hidden');
			modal.classList.add('flex');
			document.body.style.overflow = 'hidden';
		};

		// Click handler for modal close
		modal.addEventListener('click', closeModal);

		// Prevent closing when clicking on image
		modalImage.addEventListener('click', (e) => {
			e.stopPropagation();
			closeModal(); // But still close on image click
		});

		// ESC key to close
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		};
		document.addEventListener('keydown', handleEscape);

		// Add click listeners to all gallery items
		const handleGalleryClick = (e: Event) => {
			const galleryItem = (e.target as HTMLElement).closest('.gallery-item');
			if (!galleryItem) return;

			const img = galleryItem.querySelector('img');
			
			if (img) {
				e.preventDefault();
				const src = img.src;
				const alt = img.alt;
				openModal(src, alt);
			}
		};

		// Use event delegation for gallery items
		document.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;
			if (target.closest('.gallery-item')) {
				handleGalleryClick(e);
			}
		});

		// Cleanup
		return () => {
			document.removeEventListener('keydown', handleEscape);
			modal.remove();
		};
	}, []);

	return null; // This component doesn't render anything
}
