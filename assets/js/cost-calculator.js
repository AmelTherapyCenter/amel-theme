$(document).ready(function () {
	let totalQuestions = $('.question_item').length;
	let answeredQuestions;

	$('.total-questions').text(totalQuestions);
	$('.answered-questions').text(answeredQuestions);

	const updateAnswerCount = () => {
		answeredQuestions = $('.is--answered').length;
		$('.answered-questions').text(answeredQuestions);

		let progressWidth = (answeredQuestions / totalQuestions) * 100;
		$('.progress_bar').css('width', progressWidth + '%');
	};
	updateAnswerCount();

	$('.option').on('click', function () {
		let parent = $(this).closest('.question_item');
		parent.addClass('is--answered');

		parent.find('.option').each(function () {
			$(this).removeClass('is--selected');
		});

		parent.find('.option_icon.is--check').each(function () {
			$(this).css('display', 'none');
		});

		$(this).addClass('is--selected');
		$(this).find('.option_icon.is--check').css('display', 'block');

		updateAnswerCount();

		if (answeredQuestions == totalQuestions) {
			setTimeout(() => {
				$('.is--complete').css('display', 'block');
			}, 2800);
		}
	});

	const lowPriceText = $('.price-low').text();
	const highPriceText = $('.price-high').text();

	$('.survey-btn').on('click', function () {
		let totalPriceLow = 0;
		let totalPriceHigh = 0;

		if (answeredQuestions == totalQuestions) {
			$('.is--selected').each(function () {
				const priceLow = $(this).data('price-low');
				const priceHigh = $(this).data('price-high');
				const priceMultiply = $(this).data('multiplier');

				if (priceLow != '' && priceHigh != '') {
					totalPriceLow = totalPriceLow + priceLow;
					totalPriceHigh = totalPriceHigh + priceHigh;
				}

				if (priceMultiply != '') {
					totalPriceLow = totalPriceLow * priceMultiply;
					totalPriceHigh = totalPriceHigh * priceMultiply;
				}
			});

			$('.price-low').text(`${lowPriceText} $${totalPriceLow}`);
			$('.price-high').text(`${highPriceText} $${totalPriceHigh}`);
		}
	});
});
