rule Ransomware_Heuristic_Generic {
    meta:
        description = "Detects common ransomware strings and patterns"
        author = "Antigravity"
        date = "2026-02-06"
    strings:
        $s1 = "encrypt" nocase
        $s2 = "decrypt" nocase
        $s3 = "ransom" nocase
        $s4 = "bitcoin" nocase
        $s5 = ".encrypted"
        $s6 = "Your files have been encrypted"
    condition:
        2 of them
}

rule Crypto_API_Usage {
    meta:
        description = "Detects usage of Windows Crypto APIs often used by ransomware"
    strings:
        $c1 = "CryptAcquireContext"
        $c2 = "CryptEncrypt"
        $c3 = "CryptDeriveKey"
        $c4 = "BCryptEncrypt"
    condition:
        any of them
}
