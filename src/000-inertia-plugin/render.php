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
			if ( ! empty( $attributes['maxPosts'] ) ) {
				$num_of_posts = $attributes['maxPosts'];
			} else {
				$num_of_posts = 12;
			}

			$latest_posts = get_posts(
				array(
					'post_type'      => 'post',
					'posts_per_page' => $num_of_posts = $attributes['maxPosts'],
				)
			);
			?>
			<?php foreach ( $latest_posts as $latest_post ) : ?>
				<?php $latest_post_id = $latest_post->ID; ?>
				<a href="<?php echo esc_url( get_the_permalink( $latest_post_id ) ); ?>"
					class="media" aria-label="<?php echo esc_attr( get_the_title( $latest_post_id ) ); ?>">
					<?php
					if ( has_post_thumbnail( $latest_post_id ) ) {
						$attachment_id = get_post_thumbnail_id( $latest_post_id );
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
			<?php endforeach; ?>
		</div>
	</div>
</div>
