var addLink = function ( list, label, site, page ) {
	var url = '//';
	if ( site === 'wikidata' ) {
		url += 'www.' + site;
	} else if ( site === 'commons' ) {
		url += site + '.wikimedia';
	}
	url += '.org/wiki/' + mw.util.wikiUrlencode( page );
	$( '<li>' )
	  .addClass( 'wb-otherproject-link wb-otherproject-' + site )
	  .append(
		  $( '<a>' ).attr( {
			href: url,
			title: label + ': ' + page
		  } ).text( label )
	  )
	  .appendTo( list );
};

var addOtherProjects = function () {
	if ( mw.config.get( 'wgWikibaseItemId' ) === null ||
		mw.config.get( 'wgAction' ) !== 'view' ||
		mw.config.get( 'wgNamespaceNumber' ) % 2
	) {
		return;
	}

	var $pLang = $( '#p-lang' );
	if ( !$pLang.length ) {
		return;
	}

	$.ajax( {
		url: '//www.wikidata.org/w/api.php',
		data: {
			'format': 'json',
			'action': 'wbgetclaims',
			'property': 'P373',
			'entity': mw.config.get( 'wgWikibaseItemId' )
		},
		dataType: 'jsonp'
	} ).success( function ( data ) {
		var $pOther = $( '#p-wikibase-otherprojects' ),
			$pOtherList = $pOther.find( 'ul' );
		if ( !$pOther.length ) {
			$pOther = $pLang.clone().attr( 'id', 'p-wikibase-otherprojects' );
			$pOtherList = $pOther.find( 'ul' ).empty();
			$pOther.find( 'div.after-portlet-lang' ).remove();

			if ( mw.user.options.get( 'skin' ) === 'vector' ) {
				// Vector
				$pOther.attr( 'aria-labelledby', 'p-wikibase-otherprojects-label' );
				$pOtherList.attr( 'id', 'p-wikibase-otherprojects-list' );
				$pOther.find( 'h3' )
					.attr( 'id', 'p-wikibase-otherprojects-label' )
					.text( 'В других проектах' );
				var $pLangLabel = $pLang.find( 'h3' );
				if ( $pLangLabel.attr( 'tabindex' ) ) {
					var tabindex = parseInt( $pLangLabel.attr( 'tabindex' ), 10 ) + 1;
					$pLangLabel.attr( 'tabindex', tabindex );
				}
			} else {
				// Monobook & Modern
				$pOther.find( 'h3' ).text( 'В других проектах' );
				if ( !$pOther.find( 'div.pBody' ).length ) {
					$( '<div>' )
						.addClass( 'pBody' )
						.append( '<ul>' )
						.appendTo( $pOther );
					$pOtherList = $pOther.find( 'ul' );
				}
			}
		}

		var claims = data.claims;
		if ( claims &&
			claims.P373 &&
			claims.P373[0] &&
			claims.P373[0].mainsnak.datavalue
		) {
			var catName = claims.P373[0].mainsnak.datavalue.value;
			$pOtherList.find( '.wb-otherproject-commons' ).remove();
			addLink( $pOtherList, 'Викисклад', 'commons', 'Category:' + catName );
		}

		addLink( $pOtherList, 'Викиданные', 'wikidata', mw.config.get( 'wgWikibaseItemId' ) );
		$( '#t-wikibase' ).hide();

		if ( $pOtherList.children().length ) {
			$pOther.insertBefore( $pLang );
		}
	} );
};

$.when(
	$.ready,
	mw.loader.using( 'mediawiki.util' )
).done( addOtherProjects );