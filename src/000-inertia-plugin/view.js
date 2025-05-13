/**
 * This is a simple Gutenberg block, listing recent posts using GSAP Effect 000 by Made with Gsap
 * https://madewithgsap.com/effects/effect000
 *
 * Plugin author: Szymon Kądzielawa
 */

import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";

window.addEventListener("DOMContentLoaded", () => {
	gsap.registerPlugin(InertiaPlugin);

	document.querySelectorAll(".mwg_effect000").forEach((el) => {
		const root = el;
		let oldX = 0,
			oldY = 0,
			deltaX = 0,
			deltaY = 0;

		root.addEventListener("mousemove", (e) => {
			// Calculate horizontal movement since the last mouse position
			deltaX = e.clientX - oldX;

			// Calculate vertical movement since the last mouse position
			deltaY = e.clientY - oldY;

			// Update old coordinates with the current mouse position
			oldX = e.clientX;
			oldY = e.clientY;
		});

		root.querySelectorAll(".media").forEach((el) => {
			// Add an event listener for when the mouse enters each media
			el.addEventListener("mouseenter", () => {
				const tl = gsap.timeline({
					onComplete: () => {
						tl.kill();
					},
				});
				tl.timeScale(1.2); // Animation will play 20% faster than normal

				const image = el.querySelector("img");
				tl.to(image, {
					inertia: {
						x: {
							velocity: deltaX * 30, // Higher number = movement amplified
							end: 0, // Go back to the initial position
						},
						y: {
							velocity: deltaY * 30, // Higher number = movement amplified
							end: 0, // Go back to the initial position
						},
					},
				});
				tl.fromTo(
					image,
					{
						rotate: 0,
					},
					{
						duration: 0.4,
						rotate: (Math.random() - 0.5) * 30, // Returns a value between -15 & 15
						yoyo: true,
						repeat: 1,
						ease: "power1.inOut", // Will slow at the begin and the end
					},
					"<",
				); // The animation starts at the same time as the previous tween
			});
		});
	});
});
