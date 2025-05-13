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
	PanelBody,
	QueryControls,
	RangeControl,
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

function Controls({ attributes, setAttributes }) {
	const { maxPosts, order, orderBy } = attributes;

	return (
		<>
			<PanelBody title={__("Options", metadata.textdomain)}>
				<QueryControls
					{...{ order, orderBy }}
					numberOfItems={maxPosts}
					onOrderChange={(value) => setAttributes({ order: value })}
					onOrderByChange={(value) => setAttributes({ orderBy: value })}
					onNumberOfItemsChange={(value) => setAttributes({ maxPosts: value })}
				/>
			</PanelBody>
		</>
	);
}

export default function Edit({ attributes, setAttributes }) {
	const { maxPosts, order, orderBy } = attributes;

	const { latestPosts } = useSelect(
		(select) => {
			const { getEntityRecords } = select(coreStore);
			return {
				latestPosts: getEntityRecords("postType", "post", {
					order,
					orderby: orderBy,
					per_page: maxPosts,
					_embed: "wp:featuredmedia",
				}),
			};
		},
		[order, orderBy, maxPosts],
	);

	const hasPosts = !!latestPosts?.length;

	const inspectorControls = (
		<InspectorControls>
			<Controls attributes={attributes} setAttributes={setAttributes} />
		</InspectorControls>
	);

	if (!hasPosts) {
		return (
			<div {...useBlockProps()}>
				{inspectorControls}
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
			{inspectorControls}
			<section {...useBlockProps()}>
				<div className="mwg_effect000">
					<div className="medias">
						{latestPosts.map((post) => {
							const { url: imageSourceUrl, alt: featuredImageAlt } =
								getFeaturedImageDetails(post, "full");

							return (
								imageSourceUrl && (
									<a
										href={post.link}
										className="media"
										aria-label={post.title.rendered}
										title={post.title.rendered}
									>
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
