<?php
	$imienazwisko = $_POST['imienazwisko'];
	$firma = $_POST['firma'];
	$telefon = $_POST['telefon'];
	$email = $_POST['email'];
	$wiadomosc = $_POST['wiadomosc'];

	$nadawca = $email;
	// $odbiorca = "tv@diomar.pl";
	// $odbiorcaCC = "r.karbarz@diomar.pl";
	// $odbiorcaBCC = "m.lipinski@diomar.pl";
	$odbiorca = "tv@diomar.pl";
	$odbiorcaCC = "r.karbarz@diomar.pl";
	$odbiorcaBCC = "m.lipinski@diomar.pl";
	$client_ip = $_SERVER['REMOTE_ADDR'];

	// WIADOMOŚĆ GŁÓWNA
	$temat = "Prośba o rejestrację na www.wifi-tv.pl";
	$wiadomosc = '<html>'.
	'<body>'.
	'<p>Formularz z IP: '.$client_ip.'</p>'.
	'<p>Imię i nazwisko: '.$imienazwisko.'</p>'.
	'<p>Firma: '.$firma.'</p>'.
	'<p>Telefon: '.$telefon.'</p>'.
	'<p>Wiadomość: '.$wiadomosc.'</p>'.
	'</body>'.
	'</html>';

	$naglowki  = "MIME-Version: 1.0\r\n";
	$naglowki .= "Content-type: text/html; charset=UTF-8\r\n";
	$naglowki .= "From: $nadawca\r\n";
	$naglowki .= "Reply-To: $nadawca \r\n";
	
	$sukces = mail($odbiorca, $temat, $wiadomosc, $naglowki);
	mail($odbiorcaBCC, $temat, $wiadomosc, $naglowki);

	// WIADOMOŚĆ ZWROTNA
	$tematZ = "Potwierdzenie wysłania prośby o rejestrację na www.wifi-tv.pl";
	$wiadomoscZ = '<html>'.
	'<body>'.
	'<p>Wysłałeś do nas następującą wiadomość:</p>'.
	'<p>Imię i nazwisko: '.$imienazwisko.'</p>'.
	'<p>Firma: '.$firma.'</p>'.
	'<p>Telefon: '.$telefon.'</p>'.
	'<p>Wiadomość: '.$wiadomosc.'</p>'.
	'<p>Dziękujemy za wysłanie wiadomości.<br>Postaramy się odpowiedzieć naszybciej jak to będzie możliwe.</p>'.
	'</body>'.
	'</html>';

	$naglowkiZ  = "MIME-Version: 1.0\r\n";
	$naglowkiZ .= "Content-type: text/html; charset=UTF-8\r\n";
	$naglowkiZ .= "From: $odbiorca\r\n";
	$naglowkiZ .= "Reply-To: $odbiorca \r\n";

	mail($nadawca, $tematZ, $wiadomoscZ, $naglowkiZ);
	mail($odbiorcaBCC, $tematZ, $wiadomoscZ, $naglowkiZ);

	// Przekierowywujemy na potwierdzenie
	if ($sukces){
		print "<meta http-equiv=\"refresh\" content=\"0;URL=http://www.wifi-tv.pl/#/kontakt-sukces\">";
	}
	else{
		print "<meta http-equiv=\"refresh\" content=\"0;URL=http://www.wifi-tv.pl/#/kontakt-niepowodzenie\">";
	}
?>