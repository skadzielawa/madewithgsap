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
			$latest_posts = get_posts(
				array(
					'post_type'      => 'post',
					'posts_per_page' => 12,
				)
			);
			?>
			<?php foreach ( $latest_posts as $latest_post ) : ?>
				<a href="<?php echo esc_url( get_the_permalink( $latest_post->ID ) ); ?>" class="media">
					<?php
					if ( has_post_thumbnail( $latest_post->ID ) ) {
						$attachment_id = get_post_thumbnail_id( $latest_post->ID );
						echo wp_get_attachment_image( $attachment_id, 'full', false, array( 'class' => 'media-image' ) );
					}
					?>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
</div>
