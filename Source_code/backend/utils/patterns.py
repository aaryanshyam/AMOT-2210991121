# Suspicious API Categories for Malware Detection

SUSPICIOUS_APIS = {
    "file_manipulation": [
        "CreateFile", "WriteFile", "DeleteFile", "MoveFile", 
        "CopyFile", "FindFirstFile", "FindNextFile", "SetFileAttributes",
        "GetFileAttributes", "GetFileSize"
    ],
    "cryptography": [
        "CryptAcquireContext", "CryptEncrypt", "CryptDecrypt", 
        "CryptDeriveKey", "CryptGenKey", "CryptCreateHash", "CryptHashData",
        "BCryptEncrypt", "BCryptDecrypt", "BCryptGenerateSymmetricKey"
    ],
    "process_injection": [
        "CreateRemoteThread", "VirtualAllocEx", "WriteProcessMemory", 
        "OpenProcess", "CreateProcess", "EnumProcesses"
    ],
    "network_comm": [
        "InternetOpen", "InternetConnect", "HttpSendRequest", 
        "WSAStartup", "socket", "connect", "send", "recv"
    ],
    "persistence_registry": [
        "RegCreateKeyEx", "RegSetValueEx", "RegOpenKeyEx", 
        "RtlWriteRegistryValue"
    ],
    "anti_analysis": [
        "IsDebuggerPresent", "CheckRemoteDebuggerPresent", 
        "GetAdaptersInfo", "NtQueryInformationProcess"
    ]
}

# Mapping of APIs to MITRE Techniques
MITRE_MAPPING = {
    "CryptEncrypt": "T1486 (Data Encrypted for Impact)",
    "CryptAcquireContext": "T1486 (Data Encrypted for Impact)",
    "CreateRemoteThread": "T1055 (Process Injection)",
    "RegSetValueEx": "T1547 (Boot or Logon Autostart Execution)",
    "InternetConnect": "T1071 (Application Layer Protocol)",
    "DeleteFile": "T1070 (Indicator Removal on Host)",
    "FindFirstFile": "T1083 (File and Directory Discovery)"
}
