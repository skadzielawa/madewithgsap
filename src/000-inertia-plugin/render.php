<?php
/**
 * Block render callback.
 *
 * @package MadeWithGSAP
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

?>

<div <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<div class="mwg_effect000">
		<div class="medias">
			<?php
			$args = array(
				'posts_per_page'      => $attributes['maxPosts'],
				'post_status'         => 'publish',
				'order'               => $attributes['order'],
				'orderby'             => $attributes['orderBy'],
				'ignore_sticky_posts' => true,
				'no_found_rows'       => true,
			);

			$latest_posts = new WP_Query( $args );

			if ( $latest_posts->have_posts() ) {
				while ( $latest_posts->have_posts() ) {
					$latest_posts->the_post();
					?>
					<a href="<?php echo esc_url( get_the_permalink() ); ?>"
						class="media" aria-label="<?php echo esc_attr( get_the_title() ); ?>">
						<?php
						if ( has_post_thumbnail() ) {
							$attachment_id = get_post_thumbnail_id();
							echo wp_get_attachment_image(
								$attachment_id,
								'medium',
								false,
								array(
									'class' => 'media-image',
									'alt'   => '',
								)
							);
						}
						?>
					</a>
					<?php
				}
			}
			?>
		</div>
	</div>
</div>
