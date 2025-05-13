/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";

import {
	Placeholder,
	Spinner,
	RangeControl,
	PanelBody,
} from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";

import metadata from "./block.json";

function getFeaturedImageDetails(post, size) {
	const image = post._embedded?.["wp:featuredmedia"]?.["0"];

	return {
		url: image?.media_details?.sizes?.[size]?.source_url ?? image?.source_url,
		alt: image?.alt_text,
	};
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { maxPosts } = attributes;

	const { latestPosts } = useSelect(
		(select) => {
			const { getEntityRecords } = select(coreStore);
			return {
				latestPosts: getEntityRecords("postType", "post", {
					per_page: maxPosts,
					_embed: "wp:featuredmedia",
				}),
			};
		},
		[maxPosts],
	);

	const hasPosts = !!latestPosts?.length;

	if (!hasPosts) {
		return (
			<div {...useBlockProps()}>
				<Placeholder label={__("Made with Gsap - Effect 000", "madewithgsap")}>
					{!Array.isArray(latestPosts) ? (
						<Spinner />
					) : (
						__("No posts found.", "madewithgsap")
					)}
				</Placeholder>
			</div>
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Top Curve", metadata.textdomain)}>
					<RangeControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label="Columns"
						value={maxPosts}
						onChange={(value) => setAttributes({ maxPosts: value })}
						min={2}
						max={100}
					/>
				</PanelBody>
			</InspectorControls>

			<section {...useBlockProps()}>
				<div className="mwg_effect000">
					<div className="medias">
						{latestPosts.map((post) => {
							const { url: imageSourceUrl, alt: featuredImageAlt } =
								getFeaturedImageDetails(post, "full");

							return (
								imageSourceUrl && (
									<a href={post.link} className="media">
										<img src={imageSourceUrl} alt={featuredImageAlt} />
									</a>
								)
							);
						})}
					</div>
				</div>
			</section>
		</>
	);
}
