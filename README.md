# Offenso.Lab

NexusVault 
26 Jan 2026 
Adnan Kakkattil 
Web Application Vulnerability 
Assessment & Penetration Testing 
(VAPT) 
 
Table of Contents 
NexusVault ................................................................................................................................................................ 1 
1. Methodology & Scope .................................................................................................................................... 3 
1.1  Rules of Engagement (RoE) ......................................................................................................................... 3 
1.2 Source IP Documentation .............................................................................................................................. 3 
1.3 Test Accounts ............................................................................................................................................... 3 
2.Executive Summary ......................................................................................................................................... 4 
3. Testing Methodology ...................................................................................................................................... 5 
3.1. Information Gathering & Reconnaissance ...................................................................................................... 5 
3.2. Configuration & Authentication Testing ........................................................................................................ 5 
3.3. Impact Assessment & Reporting ................................................................................................................... 6 
4.Key Findings ....................................................................................................................................................7 
5.Technical  Findings ......................................................................................................................................... 8 
5.1 Information Exposure through Source Code Comments................................................................................... 8 
5.2 Authentication Bypass via Hardcoded Debug Key .........................................................................................10 
5.3 Critical Local File Inclusion (LFI) via Debug Log Endpoint ........................................................................... 12 
5.4 Authentication Bypass via IP Spoofing and Hardcoded API Key .................................................................... 15 
5.5 Insecure Password Hashing (Unsalted MD5) ................................................................................................. 18 
5.6 Weak Password Policy and Successful Brute-Force Attack ............................................................................. 21 
5.7 Exposure of Sensitive Information in JavaScript Files ................................................................................... 24 
5.8 Sensitive Information Disclosure via /proc/self/environ (LFI) ........................................................................ 26 
5.9 GraphQL Introspection Enabled in Production .............................................................................................. 28 
5.10 Mass Data Exfiltration (PII) via GraphQL users Object ................................................................................ 31 
5.11 Internal Infrastructure Disclosure via GraphQL ........................................................................................... 33 
5.12 Unauthorized File Path Disclosure (Documents) via GraphQL ..................................................................... 36 
5.13 Insecure Direct Object Reference (IDOR) in Document Listing ................................................................... 39 
5.14 Insecure Direct Object Reference (IDOR) on Document Download ............................................................... 41 
5.15 Insecure Direct Object Reference (IDOR) on Document Deletion ................................................................ 44 
5.16 Insecure Direct Object Reference (IDOR) on Document Comments ............................................................. 47 
5.17 Information Exposure of Unresolved Security Vulnerabilities ....................................................................... 51 
 
1. Methodology & Scope 
1.1  Rules of Engagement (RoE) 
This assessment was conducted under a strict Gray Box methodology. The following 
constraints were observed during the engagement: 
• Scope: Testing was strictly limited to the web application layer of 
https://nexusvault.space/. 
• Exclusions: No network-level activities or infrastructure-level attacks were performed. 
• Compliance: All activities were monitored to ensure zero RoE violations. 
1.2 Source IP Documentation 
As per the reporting requirements, the following IP addresses were utilized during the testing 
phase: 
• Public Source IP: 117.196.17.53 
1.3 Test Accounts 
The following accounts were created or utilized to perform the assessment: 
• Account 1: contact.adnanks@gmail.com  
• Account 2: Contact.ashlin@gmail.com 
• Account 3: hacker404@gmail.com 
2.Executive Summary 
This report details the findings of a Gray Box Web Application Penetration Test 
conducted on the specified target. The assessment aimed to identify security vulnerabilities, 
evaluate their potential business impact, and provide actionable remediation strategies to 
strengthen the application's security posture. 
The engagement followed industry-standard methodologies, focusing strictly on the web 
application layer as per the Rules of Engagement (ROE). 
The assessment identified several critical and high-severity vulnerabilities that pose a 
significant risk to data confidentiality and system integrity. The most concerning findings 
include Authentication Bypass via IP Spoofing, Insecure Direct Object References (IDOR), 
and Local File Inclusion (LFI). 
The presence of hardcoded credentials and sensitive API keys within the source code suggests a 
lack of secure coding practices and secret management. Furthermore, the use of unsalted MD5 
hashes for passwords indicates a critical weakness in protecting user credentials against offline 
attacks. 
3. Testing Methodology 
The assessment was executed through a structured four-phase process to ensure comprehensive 
coverage of the application layer within the 24-hour window. 
3.1. Information Gathering & Reconnaissance 
The objective was to map the application's attack surface and understand its architecture. 
Tech Stack Identification: Used browser-based tools and intercepting proxies to identify the 
server-side languages, frameworks, and database types. 
Endpoint Enumeration: Performed directory brute-forcing and analyzed client-side 
JavaScript to uncover hidden paths and sensitive endpoints. 
GraphQL Schema Introspection: Attempted introspection queries to map the GraphQL 
API structure, which led to the discovery of sensitive data exposure. 
3.2. Configuration & Authentication Testing 
This phase focused on how the application manages sessions and identifies users. 
Authentication Bypass: Tested the trust boundaries of the application, specifically 
attempting to bypass restrictions using X-Forwarded-For and X-Remote-IP headers (resulting in 
the IP Spoofing finding). 
Password Policy Analysis: Evaluated the complexity requirements and entropy of the 
password update mechanisms. 
Credential Storage Analysis: Inspected the backend responses and leaked configuration 
files to identify the Unsalted MD5 hashing and Hardcoded Credentials. 
The core phase where active testing was performed to confirm the presence of vulnerabilities. 
Broken Object Level Authorization (BOLA/IDOR): Manipulated user_id and account_id 
parameters in API requests to determine if the application correctly enforced ownership of data. 
Insecure File Handling: Tested parameters for Local File Inclusion (LFI) by attempting to 
traverse directories and access sensitive system files (e.g., /etc/passwd ). 
Source Code & Secret Analysis: Conducted a manual review of reachable source code and 
debug logs to find the Hardcoded Debug API Key and sensitive internal paths. 
3.3. Impact Assessment & Reporting 
The final phase involved quantifying the risk and documenting the evidence. 
Risk Scoring: Each finding was rated using the CVSS v3.0 (Common Vulnerability Scoring 
System) to provide a standardized severity level. 
Proof of Concept (PoC): Captured evidence (screenshots and request/response logs) for 
every vulnerability to ensure reproducibility. 
Remediation Guidance: Developed specific technical fixes for the development team based 
on secure coding best practices. 
Methodology Standards Alignment 
The testing was conducted in alignment with the following industry frameworks: 
OWASP Top 10 (2021): The primary reference for identifying the most critical web risks. 
WSTG (Web Security Testing Guide): Used for the technical execution of manual test 
cases. 
CVSS v3.0: Used for consistent and objective risk rating. 
4.Key Findings 
• Information Exposure through Source Code Comments (Critical) 
• Authentication Bypass via Hardcoded Debug Key (Critical) 
• Critical Local File Inclusion (LFI) via Debug Log Endpoint (High) 
• Authentication Bypass via IP Spoofing (Critical) 
• Insecure Password Hashing (Unsalted MD5) (High) 
• Weak Password Policy (High) 
• Brute-Force Attack (High) 
• Exposure of Sensitive Information in JavaScript Files (High) 
• Sensitive Information Disclosure via /proc/self/environ (LFI) (Critical) 
• GraphQL Introspection Enabled in Production (Medium) 
• Mass Data Exfiltration (PII) via GraphQL users Object (Critical) 
• Internal Infrastructure Disclosure via GraphQL (Critical) 
• Unauthorized File Path Disclosure (Documents) via GraphQL (Critical) 
• Insecure Direct Object Reference (IDOR) in Document Listing (High) 
• Insecure Direct Object Reference (IDOR) on Document Download (High) 
• Insecure Direct Object Reference (IDOR) on Document Deletion (High) 
• Insecure Direct Object Reference (IDOR) on Document Comments (Medium) 
•  Critical Information Disclosure via Internal Admin API (Critical) 
•  Information Exposure of Unresolved Security Vulnerabilities (Medium) 
5.Technical  Findings 
5.1 Information Exposure through Source Code Comments 
Vulnerability Details 
• Vulnerability Name: Information Exposure through Source Code Comments 
• Description: The web application's production environment contains sensitive 
internal configuration details, debug endpoints, and administrative credentials 
within HTML/JavaScript comments. This information is accessible to any user 
who views the page's source code. 
• CVSS v3.0 Score: 9.1 (Critical) 
• Severity Rating: CRITICAL 
Affected Components/Endpoints 
• Vulnerable Source: Client-side HTML source code (viewable via view-source:) 
• Exposed Endpoints: 
o /__debug/config 
o /__debug/users (Leaking user list with hashes) 
o /__debug/logs 
o /api/v1/internal/admin 
• Exposed Credentials: nvault_debug_2024_internal (Debug Key) 
Technical and Business Impact 
• Technical Impact: An attacker can gain full knowledge of the internal API structure, 
access plaintext logs, and retrieve user password hashes. The exposed Debug Key may 
allow administrative access to the /__debug/* endpoints, leading to further compromise 
of the database or server configuration. 
• Business Impact: High risk of a data breach. Exposure of user hashes and internal 
endpoints directly compromises user privacy and corporate security. It provides a 
roadmap for attackers to exploit secondary vulnerabilities (like JWT algorithm confusion 
or XSLT injection) explicitly mentioned in the "Known Issues" section. 
Step-by-Step Reproduction Steps 
1. Open a web browser and navigate to the target application URL. 
2. Right-click on the page and select "View Page Source" or press Ctrl + U. 
3. Search for the string ```` 
Proof of Concept (PoC) 
Recommended Remediations 
1. Immediate Action: Strip all development-related comments, debug information, and 
internal roadmaps from the code before deploying to the production environment. 
2. Credential Rotation: Immediately invalidate the nvault_debug_2024_internal key and any 
other credentials referenced in the "Known Issues" or "Internal Endpoints" section. 
3. Endpoint Protection: Ensure that all /__debug/ and /api/v1/internal/ endpoints are 
restricted at the network/firewall level and require strong, multi-factor authentication, 
even if the URL is known. 
4. Authentication Bypass via Hardcoded Debug Key 
5.2 Authentication Bypass via Hardcoded Debug Key 
Vulnerability Details 
• Vulnerability Name: Authentication Bypass via Hardcoded Debug Key 
• Description: The application utilizes a custom HTTP header (X-Debug-Key) to 
authorize access to administrative debug endpoints. By utilizing the hardcoded key 
discovered in the source code, an attacker can bypass standard authentication 
mechanisms and gain unauthorized access to internal configuration and user data. 
CVSS v3.0 Score & Severity Rating 
• CVSS v3.0 Score: 9.8 (Critical) 
• Severity Rating: CRITICAL 
Affected Components/Endpoints 
• /__debug/config (Application Configuration) 
• /__debug/users (User Database/Hashes) 
• Authorization Mechanism: X-Debug-Key HTTP Header 
Technical and Business Impact 
• Technical Impact: Full exposure of the application's environment variables, database 
connection strings (found in /config), and the complete user database including password 
hashes (found in /users). This allows for lateral movement and offline password cracking. 
• Business Impact: Total compromise of user account security and system integrity. The 
leak of configuration data could lead to a full infrastructure breach if database or third
party API credentials are recovered. 
Step-by-Step Reproduction Steps 
1. Attempt to access https://nexusvault.space/__debug/config directly; observe a 401 
Unauthorized or 403 Forbidden response. 
2. Intercept the request using a proxy tool (e.g., Burp Suite) or use a command-line tool like 
curl. 
3. Inject the custom header: X-Debug-Key: nvault_debug_2024_internal. 
4. Send the request https://nexusvault.space/__debug/config and observe the successful leak 
of system configurations. 
5. Repeat the request for https://nexusvault.space/__debug/users to retrieve the list of users 
and their unsalted MD5 hashes. 
Proof of Concept (PoC) 
Recommended Remediations 
1. Disable Debug Endpoints: Completely disable or remove all /__debug/ endpoints from 
the production build. 
2. Robust Authentication: Replace header-based "secret key" authentication with a 
centralized Identity Provider (IdP) or robust RBAC (Role-Based Access Control) that 
requires a valid, authenticated session from a privileged user. 
5.3 Critical Local File Inclusion (LFI) via Debug Log Endpoint 
Vulnerability Details 
• Vulnerability Name: Local File Inclusion (LFI) 
• Description: The /__debug/logs endpoint is vulnerable to Local File Inclusion. While a 
direct request to the endpoint returns a 500 Internal Server Error revealing the internal 
file path, the endpoint accepts a file parameter that does not properly sanitize user input. 
An attacker can use directory traversal sequences (../) to escape the intended directory 
and read arbitrary files on the server. 
CVSS v3.0 Score & Severity Rating 
• CVSS v3.0 Score: 8.6 (High) 
• Severity Rating: HIGH 
Affected Components/Endpoints 
• Vulnerable Endpoint: /__debug/logs 
• Vulnerable Parameter: file 
Technical and Business Impact 
• Technical Impact: An attacker can read sensitive system files (e.g., /etc/passwd), 
application source code, and configuration files containing database credentials or 
environment variables. This can lead to full system compromise or remote code 
execution (RCE) if log poisoning techniques are applicable. 
• Business Impact: High risk of full data breach and unauthorized access to the server 
infrastructure. Exposure of system-level files compromises the entire security boundary 
of the web application host. 
Step-by-Step Reproduction Steps 
1. Navigate to the /__debug/logs endpoint using the previously discovered X-Debug-Key. 
2. Observe the 500 Internal Server Error response, which reveals a "No such file or 
directory" error for /var/log/nexusvault/app.log, suggesting a file-reading mechanism is 
active. 
3. Append the file parameter to the URL with a directory traversal payload: 
?file=../../../../etc/passwd. 
4. Send the request and observe the server returning the contents of the /etc/passwd file in 
the JSON response. 
Proof of Concept (PoC) 
Recommended Remediations 
Input Validation: Implement strict allow-listing for the file parameter. Only predefined log 
filenames should be accepted. 
Path Normalization: Use filesystem APIs that resolve and validate the absolute path before 
opening a file to ensure it remains within the /var/log/nexusvault/ directory. 
Filesystem Permissions: Run the web application service with a low-privileged user (e.g., 
www-data) and use filesystem ACLs to prevent the web user from reading sensitive files like 
/etc/passwd. 
Remove Debug Functionality: As previously recommended, the entire /__debug/ suite should 
be removed from production environments to eliminate the attack surface entirely. 
5.4 Authentication Bypass via IP Spoofing and Hardcoded API Key 
Vulnerability Details 
• Vulnerability Name: Authentication Bypass via IP Spoofing and Hardcoded Credentials 
• Description: The /api/v1/internal/admin endpoint requires two layers of validation: a 
valid X-API-Key and a request originating from an internal/localhost IP address. 
However, the application relies on the user-controllable X-Forwarded-For HTTP header 
to verify the source IP. An attacker can provide a leaked API key and spoof their IP 
address to appear as 127.0.0.1, completely bypassing the security restrictions. 
CVSS v3.0 Score & Severity Rating 
• CVSS v3.0 Score: 10.0 (Critical) 
• Severity Rating: CRITICAL 
Affected Components/Endpoints 
• Vulnerable Endpoint: /api/v1/internal/admin 
• Vulnerable Headers: X-API-Key, X-Forwarded-For 
Technical and Business Impact 
• Technical Impact: Successful exploitation provides full administrative access to the 
internal API. This includes the ability to view all administrative users and sensitive 
database connection strings (e.g., sqlite:////app/instance/nexusvault.db). 
• Business Impact: Total loss of confidentiality, integrity, and availability. An attacker can 
manipulate administrative accounts, access the underlying database directly using leaked 
paths/keys, and potentially take over the entire server infrastructure. 
Step-by-Step Reproduction Steps 
1. Obtain the internal API key (nvk_d56f1953e015cc01e79c84028089135d) previously 
leaked via the /__debug/users or source code comments. 
2. Attempt to access https://nexusvault.space/api/v1/internal/admin using the X-API-Key 
and X-Debug-Key headers. 
3. Observe the response: "admin_users": "Access denied", which also reflects your current 
public IP address (e.g., 117.196.17.53). 
4. Inject the X-Forwarded-For: 127.0.0.1 header into the request to spoof a localhost origin. 
5. Send the request again and observe the full JSON response containing admin user details 
and the internal database configuration. 
Proof of Concept (PoC) 
Recommended Remediations 
1. Stop Relying on X-Forwarded-For for Security: Never use X-Forwarded-For or 
similar headers for security-critical authorization decisions, as they are easily 
manipulated by clients. 
2. Verify Source IP at the Network Level: Use web server configurations (e.g., Nginx 
allow/deny rules) or a Firewall/WAF to restrict access to internal APIs based on the 
actual connection IP, not HTTP headers. 
3. Rotate All Leaked Secrets: Immediately change the X-API-Key and the database 
secret_key revealed in the admin configuration. 
5.5 Insecure Password Hashing (Unsalted MD5) 
Vulnerability Details 
• Vulnerability Name: Insecure Password Hashing (Unsalted MD5) 
• Description: The application stores user passwords using the MD5 hashing algorithm 
without the use of a salt. MD5 is cryptographically broken and prone to collision attacks. 
Because no salt is used, identical passwords result in identical hashes, making them 
highly susceptible to precomputed "rainbow table" attacks and high-speed brute-force 
cracking. 
CVSS v3.0 Score & Severity Rating 
• CVSS v3.0 Score: 7.5 (High) 
• Severity Rating: HIGH 
Affected Components/Endpoints 
• Database Table: User credentials storage (accessed via /__debug/users) 
• Impacted Account: admin and all other roles accounts 
Technical and Business Impact 
• Technical Impact: Once the hashes are leaked (as demonstrated in Finding 2), an 
attacker can use common hardware to crack them in seconds. The lack of a salt allows an 
attacker to crack passwords for the entire user base simultaneously using rainbow tables. 
• Business Impact: Direct compromise of administrative and user accounts. If users reuse 
these passwords on other services (a common occurrence), the breach of this application 
leads to a wider compromise of the users' digital identities. 
Step-by-Step Reproduction Steps 
1. Access the user hash list via the /__debug/users endpoint as demonstrated in previous 
findings. 
2. Identify the hash for the admin : 5f4dcc3b5aa765d61d8327deb882cf99. 
3. Utilize an offline cracking tool (like Hashcat or John the Ripper) or an online MD5 
recovery service. 
4. Observe that the hash is immediately recognized as the plaintext string: admin. 
Proof of Concept (PoC) 
Username 
Email 
Password  
admin 
admin@nexusvault.local 
password 
sarah.chen 
sarah.chen@techflow.io 
Keepmesafeandwarm 
hacker_admin hacker@evil.com 
password123 
Recommended Remediations 
1. Upgrade Hashing Algorithm: Immediately migrate from MD5 to a modern, memory
hard password hashing algorithm such as Argon2id (preferred) or bcrypt. 
2. Implement Salting: Ensure every password has a unique, cryptographically strong 
random salt (at least 16 bytes) appended before hashing to prevent rainbow table attacks. 
3. Mandatory Password Reset: Following the implementation of secure hashing, force all 
users (especially administrators) to reset their passwords, as the current hashes must be 
considered compromised. 
4. Strengthen Password Policy: Implement a policy requiring a minimum of 12 characters, 
including mixed-case letters, numbers, and symbols to increase the time required for 
brute-force attacks. 
5.6 Weak Password Policy and Successful Brute-Force Attack 
Vulnerability Details 
• Vulnerability Name: Weak Password Policy & Lack of Brute-Force Protection 
• Description: The application's login interface does not implement rate limiting, account 
lockout mechanisms, or CAPTCHAs to prevent automated login attempts. Combined 
with a weak password policy that allowed the administrator to use a common, easily 
guessable password, an attacker can programmatically test thousands of password 
combinations until the correct one is found. 
CVSS v3.0 Score & Severity Rating 
• CVSS v3.0 Score: 8.1 (High) 
• Severity Rating: HIGH 
Affected Components/Endpoints 
• Endpoint: /login  
• Affected Account: admin 
Technical and Business Impact 
• Technical Impact: Unauthorized administrative access to the application's backend. 
Once logged in as an administrator, an attacker can modify application data, manage 
users, and potentially exploit further vulnerabilities within the administrative dashboard 
to gain server-level access. 
• Business Impact: High risk of service disruption, data manipulation, and reputational 
damage. An attacker with admin access can exfiltrate sensitive user data or deface the 
web application. 
Step-by-Step Reproduction Steps 
1. Navigate to the login page of the application. 
2. Capture a login request using an intercepting proxy (e.g., Burp Suite). 
3. Send the request to a brute-force tool (e.g., Burp Intruder). 
4. Configure the tool to target the password field while keeping the username as admin. 
5. Load a standard "top 1000 common passwords" wordlist. 
6. Launch the attack and monitor the response status codes and lengths. 
7. Observe a successful login (indicated by a 302 Redirect or a different response length) 
when the password password is tested. 
Proof of Concept (PoC) 
Recommended Remediations 
1. Implement Rate Limiting: Restrict the number of failed login attempts from a single IP 
address within a specific timeframe (e.g., 5 attempts per 15 minutes). 
2. Account Lockout Policy: Temporarily lock accounts after a consecutive number of 
failed login attempts to thwart automated guessing. 
3. Enforce Strong Password Policies: Require a minimum password length (e.g., 12+ 
characters) and the inclusion of uppercase, lowercase, numbers, and special characters. 
4. Multi-Factor Authentication (MFA): Implement MFA for all accounts, particularly 
administrative ones, to ensure that a stolen password alone is insufficient for access. 
5. Use CAPTCHA: Integrate a CAPTCHA mechanism (like reCAPTCHA) on the login 
page to distinguish between human users and automated bots. 
5.7 Exposure of Sensitive Information in JavaScript Files 
Vulnerability Details 
• Vulnerability Name: Information Exposure in Source Code (JavaScript) 
• Description: The application's production JavaScript bundle (main.chunk.js) contains 
unminified code blocks revealing internal feature flags, debug API keys, and a list of 
internal endpoints that should be restricted from public view. 
CVSS v3.0 Score & Severity Rating 
• CVSS v3.0 Score: 7.5 (High) 
• Severity Rating: HIGH 
Affected Components/Endpoints 
• Vulnerable File: /static/js/main.chunk.js 
• Exposed Secrets: nvault_debug_2024_internal (apiKey) 
• Exposed Internal Endpoints: 
o /api/v1/internal/admin 
o /__debug/config, /__debug/metrics, /__debug/logs 
o /.well-known/internal-status 
Technical and Business Impact 
• Technical Impact: Provides an attacker with a clear map of the application's internal 
architecture and administrative interfaces. This facilitates targeted attacks against these 
endpoints using the discovered debug key. 
• Business Impact: Increases the risk of unauthorized access to administrative functions. 
The presence of "TODO" comments (e.g., "Remove before production deployment!") 
indicates a failure in the secure software development lifecycle (SDLC). 
Step-by-Step Reproduction Steps 
1. Open the browser's Developer Tools (F12) and navigate to the Sources or Network tab. 
2. Locate and open the /static/js/main.chunk.js file. 
3. Search for keywords such as DEBUG, apiKey, or INTERNAL_ENDPOINTS. 
4. Observe the plaintext configuration object containing sensitive keys and paths. 
Proof of Concept (PoC) 
Recommended Remediations 
1. Code Minification: Use build tools to minify and "uglify" JavaScript code, which 
removes comments and renames variables to hinder manual analysis. 
2. Environment Separation: Use environment variables to ensure debug configurations are 
never compiled into production builds. 
3. Secrets Management: Never hardcode API keys or secrets in client-side code; use 
secure server-side session management instead. 
5.8 Sensitive Information Disclosure via /proc/self/environ (LFI) 
Vulnerability Details 
• Vulnerability Name: Sensitive Information Disclosure via /proc/self/environ (LFI) 
• Description: The /proc/self/environ file is a special file in Linux that stores the 
environment variables of the current process (in this case, the web server). Accessing this 
file via LFI is a critical security flaw because it often leaks API keys, database 
credentials, and internal system paths. Furthermore, if the User-Agent header is reflected 
in this file, it can be used for Log Poisoning to achieve Remote Code Execution (RCE). 
CVSS v3.0 Score & Severity Rating 
• CVSS v3.0 Score: 9.8 (Critical) 
• Severity Rating: CRITICAL 
Affected Components/Endpoints 
• Vulnerable Endpoint: /__debug/logs 
• Vulnerable Parameter: file 
• Accessed File: /proc/self/environ 
Technical and Business Impact 
• Technical Impact: Complete disclosure of active environment variables. As seen in the 
PoC, this includes the JWT_SECRET_KEY, DATABASE_URL (revealing the full path 
to the SQLite database), and the nvault_debug_2024_internal key. This provides all 
necessary secrets to forge authentication tokens and access the database directly. 
• Business Impact: Total compromise of the application's security secrets. An attacker can 
use these leaked keys to impersonate any user, including administrators, and permanently 
breach the underlying database or infrastructure. 
Step-by-Step Reproduction Steps 
1. Navigate to the vulnerable logs endpoint: https://nexusvault.space/__debug/logs. 
2. Provide the X-Debug-Key header for authorization as discovered in Finding 2. 
3. Inject the traversal payload targeting the environment file: 
?file=../../../../proc/self/environ. 
4. Observe the response containing a single line of concatenated environment variables, 
including secrets like JWT_SECRET_KEY and DATABASE_URL. 
Proof of Concept (PoC) 
Recommended Remediations 
1. Restrict /proc Access: Ensure the web server user does not have permissions to read 
files in the /proc filesystem. 
2. Filesystem Chroot/Containerization: Run the application in a restricted environment 
(like a Docker container with limited mounts) to prevent access to sensitive host system 
files. 
3. Secure Secret Storage: Stop using environment variables for sensitive keys like 
JWT_SECRET_KEY. Use a dedicated secret management service (e.g., AWS Secrets 
Manager, HashiCorp Vault). 
5.9 GraphQL Introspection Enabled in Production 
• Vulnerability Name: GraphQL Introspection Enabled in Production 
• Description: The application's GraphQL endpoint permits introspection queries. This 
enables an unauthenticated attacker to retrieve the entire API schema, including all 
available queries, mutations, types, and fields. While introspection is a standard feature 
for development, leaving it active in production provides a detailed roadmap of the API's 
internal structure. 
CVSS v3.0 Score & Severity Rating 
• CVSS v3.0 Score: 5.3 (Medium) 
• Severity Rating: MEDIUM 
Affected Components/Endpoints 
• Vulnerable Endpoint: /graphql (identified as active in production via source code 
analysis) 
• Vulnerable Feature: Introspection Query (__schema) 
Technical and Business Impact 
• Technical Impact: Full disclosure of the API schema. This information can be used to 
identify sensitive operations (like administrative mutations), discover hidden fields, and 
understand data relationships, significantly reducing the effort required for targeted 
attacks such as IDOR, Broken Function Level Authorization, or Injection. 
• Business Impact: Increased risk of data breaches and unauthorized data modification. 
The exposure of the schema provides competitors or malicious actors with insights into 
the application's business logic and internal data models. 
Step-by-Step Reproduction Steps 
1. Identify the GraphQL endpoint from the leaked source code: 
https://nexusvault.space/api/graphql. 
2. Open the endpoint in the browser 
3. Input the  following JSON body:  
{ 
} 
__schema{ 
queryType{ 
fields{ 
description 
name 
} 
} 
} 
4. Observe the server's response, which contains a JSON-formatted list of all types and 
fields in the application's schema. 
Proof of Concept (PoC) 
Recommended Remediations 
1. Disable Introspection in Production: Ensure that GraphQL introspection is disabled in 
all production and publicly accessible environments. It should only be enabled in 
development or staging environments where access is strictly limited. 
2. Disable Field Suggestions: Most GraphQL engines provide "did you mean?" 
suggestions for mistyped fields, which can still leak schema info even if introspection is 
off. Disable this feature in production. 
3. Implement Fine-Grained Authorization: Ensure that every query and mutation has 
strict authorization checks at the resolver level to prevent unauthorized data access even 
if an attacker knows the schema. 
4. Security Review of Schema: If introspection must remain enabled for a public API, 
conduct a thorough security review to ensure no internal, sensitive, or administrative 
fields are exposed. 
5.10 Mass Data Exfiltration (PII) via GraphQL users Object 
Vulnerability Details 
• Vulnerability Name: Sensitive Data Exposure via GraphQL 
• Description: Because the GraphQL endpoint lacks proper authorization and field-level 
security, an attacker can craft specific queries to exfiltrate the entire user database and 
system metadata. The endpoint returns sensitive information such as password hashes, 
password reset tokens, and internal server paths to unauthenticated users. 
CVSS v3.0 Score & Severity Rating 
• CVSS v3.0 Score: 9.8 (Critical) 
• Severity Rating: CRITICAL 
Affected Components/Endpoints 
• Vulnerable Endpoint: /api/graphql 
• Affected Objects: users 
Technical and Business Impact 
• Technical Impact: Mass exfiltration of user credentials. The exposure of 
passwordResetToken allows for account takeover of any user. Furthermore, the 
systemConfig object leaks the databaseUrl, confirming the path for the LFI attack. 
• Business Impact: Total loss of user privacy and regulatory non-compliance (e.g., 
GDPR). The leak of internal document paths can lead to the unauthorized download of 
proprietary company information. 
Step-by-Step Reproduction Steps 
1. Navigate to the GraphQL interface identified in the source code. 
2. Craft a query to fetch all fields from the users object: query { users { id username email 
passwordHash passwordResetToken apiKey isAdmin } } 
Proof of Concept (PoC) 
Recommended Remediations 
1. Object-Level Authorization: Implement strict authorization checks in your GraphQL 
resolvers. A user should only be able to query their own data, and sensitive fields (like 
passwordHash or apiKey) should never be returned by public queries. 
2. Schema Hardening: Remove sensitive system fields like databaseUrl and jwtSecretHint 
from the production GraphQL schema. 
3. Query Depth Limiting: Implement query depth and complexity limiting to prevent 
Resource Exhaustion (DoS) attacks via nested GraphQL queries. 
4. Audit Logs: Enable detailed logging for all GraphQL mutations and sensitive queries to 
detect mass data exfiltration attempts. 
5.11 Internal Infrastructure Disclosure via GraphQL 
Vulnerability Details 
• Vulnerability Name: Sensitive Data Exposure via GraphQL 
• Description: Because the GraphQL endpoint lacks proper authorization and field-level 
security, an attacker can craft specific queries to exfiltrate the entire user database and 
system metadata. The endpoint returns sensitive information such as password hashes, 
password reset tokens, and internal server paths to unauthenticated users. 
CVSS v3.0 Score & Severity Rating 
• CVSS v3.0 Score: 9.8 (Critical) 
• Severity Rating: CRITICAL 
Affected Components/Endpoints 
• Vulnerable Endpoint: /api/graphql 
• Affected Objects: systemConfig 
Technical and Business Impact 
• Technical Impact: Mass exfiltration of user credentials. The exposure of the 
systemConfig object leaks the databaseUrl, confirming the path for the LFI attack. 
• Business Impact: Total loss of user privacy and regulatory non-compliance (e.g., 
GDPR). The leak of internal document paths can lead to the unauthorized download of 
proprietary company information. 
Step-by-Step Reproduction Steps 
3. Navigate to the GraphQL interface identified in the source code. 
4. Craft a query to fetch all fields from the systemConfig object: 
{ 
} 
systemConfig{ 
databaseUrl 
uploadFolder 
secretKeyHint 
jwtSecretHint 
internalEndpoints 
debugMode 
} 
Proof of Concept (PoC) 
Recommended Remediations 
5. Object-Level Authorization: Implement strict authorization checks in your GraphQL 
resolvers. A user should only be able to query their own data, and sensitive fields (like 
passwordHash or apiKey) should never be returned by public queries. 
6. Schema Hardening: Remove sensitive system fields like databaseUrl and jwtSecretHint 
from the production GraphQL schema. 
7. Query Depth Limiting: Implement query depth and complexity limiting to prevent 
Resource Exhaustion (DoS) attacks via nested GraphQL queries. 
8. Audit Logs: Enable detailed logging for all GraphQL mutations and sensitive queries to 
detect mass data exfiltration attempts. 
5.12 Unauthorized File Path Disclosure (Documents) via GraphQL 
Vulnerability Details 
• Vulnerability Name: Sensitive Data Exposure via GraphQL 
• Description: Because the GraphQL endpoint lacks proper authorization and field-level 
security, an attacker can craft specific queries to exfiltrate the entire user database and 
system metadata. The endpoint returns sensitive information such as password hashes, 
password reset tokens, and internal server paths to unauthenticated users. 
CVSS v3.0 Score & Severity Rating 
• CVSS v3.0 Score: 9.8 (Critical) 
• Severity Rating: CRITICAL 
Affected Components/Endpoints 
• Vulnerable Endpoint: /api/graphql 
• Affected Objects: documents 
Technical and Business Impact 
• Technical Impact: Mass exfiltration of user credentials. The exposure of the documents 
object leaks the databaseUrl, confirming the path for the LFI attack. 
• Business Impact: Total loss of user privacy and regulatory non-compliance (e.g., 
GDPR). The leak of internal document paths can lead to the unauthorized download of 
proprietary company information. 
Step-by-Step Reproduction Steps 
5. Navigate to the GraphQL interface identified in the source code. 
6. Craft a query to fetch all fields from the systemConfig object: 
{ 
} 
documents{ 
id 
uuid 
title 
status 
ownerId 
filename 
fileSize 
filePath 
category 
classification 
} 
Proof of Concept (PoC) 
Recommended Remediations 
Object-Level Authorization: Implement strict authorization checks in your GraphQL 
resolvers. A user should only be able to query their own data, and sensitive fields (like 
passwordHash or apiKey) should never be returned by public queries. 
Schema Hardening: Remove sensitive system fields like databaseUrl and 
jwtSecretHint from the production GraphQL schema. 
Query Depth Limiting: Implement query depth and complexity limiting to prevent 
Resource Exhaustion (DoS) attacks via nested GraphQL queries. 
Audit Logs: Enable detailed logging for all GraphQL mutations and sensitive queries 
to detect mass data exfiltration attempts. 
5.13 Insecure Direct Object Reference (IDOR) in Document Listing 
Vulnerability Details 
• Vulnerability Name: Insecure Direct Object Reference (IDOR) 
• Description: The /documents/{id} endpoint does not properly validate if the currently 
logged-in user has the permission to access the requested document ID. By changing the 
integer ID in the request, an attacker can enumerate and access all files stored in the 
NexusVault system. 
CVSS v3.0 Score & Severity Rating 
• CVSS v3.0 Score: 7.5 (High) 
• Severity Rating: HIGH 
Affected Components/Endpoints 
• Vulnerable Endpoint: /documents/{id} 
• Affected Functionality: Document Preview and Download 
Technical and Business Impact 
• Technical Impact: Unauthorized access to sensitive files across the entire application. 
As shown in the PoC, this includes access to administrative files like xxe.xml which were 
not intended for the current user. 
• Business Impact: High risk of data exfiltration and breach of confidentiality. 
Unauthorized access to internal documents can lead to the exposure of trade secrets, 
personal data, or further system vulnerabilities. 
Step-by-Step Reproduction Steps 
1. Log in to the application as a standard user. 
2. Navigate to the "Documents" section and select one of your own files. 
3. Observe the URL or the GET request in your proxy (e.g., /documents/10). 
4. Modify the ID in the request to an ID not belonging to your account (e.g., change 10 to 
42). 
5. Send the request and observe that the application renders the details and download link 
for the unauthorized document, such as xxe.xml uploaded by the admin user. 
Proof of Concept (PoC) 
Recommended Remediations 
1. Implement Server-Side Authorization: For every request to /documents/{id}, the 
application must verify that the authenticated user's ID matches the owner_id of the 
document in the database. 
2. Use Indirect Reference Maps: Instead of using predictable database integer IDs, use 
complex, non-sequential identifiers like UUIDs to make enumeration significantly more 
difficult. 
3. Implement Access Control Lists (ACL): Use a robust RBAC/ACL framework to define 
and enforce fine-grained permissions for every file resource. 
5.14 Insecure Direct Object Reference (IDOR) on Document 
Download 
Vulnerability Details 
• Vulnerability Name: IDOR on File Download 
• Description: The /documents/{id}/download endpoint fails to verify if the authenticated 
user has the rights to download the file associated with the requested ID. An attacker can 
successfully download sensitive files by simply incrementing the ID in the download 
request. 
CVSS v3.0 Score & Severity Rating 
• CVSS v3.0 Score: 7.5 (High) 
• Severity Rating: HIGH 
Affected Components/Endpoints 
• Vulnerable Endpoint: /documents/{id}/download 
• Impacted Data: User-uploaded documents and system XML files 
Technical and Business Impact 
• Technical Impact: Direct exfiltration of sensitive data. In this case, the attacker 
successfully downloaded an xxe.xml file that reveals internal system path logic 
(/var/www/nexusvault/app.py), which could be used to facilitate a secondary attack like 
External Entity Injection (XXE). 
• Business Impact: High risk of a major data breach. The ability for any user to download 
administrative files completely breaks the application's multi-tenant isolation and 
confidentiality guarantees. 
Step-by-Step Reproduction Steps 
1. Log in as a standard user and identify a valid session cookie. 
2. Capture the download request for a legitimate file: GET /documents/44/download. 
3. Modify the ID to target a known sensitive file ID (e.g., 44) discovered via GraphQL or 
ID enumeration. 
4. Send the request and observe the server returning a 200 OK response with the Content
Disposition: attachment; filename=xxe.xml header. 
5. Observe that the file content is successfully downloaded, revealing internal system paths. 
Proof of Concept (PoC): 
Recommended Remediations 
1. Authorize Every Download: Implement a strict server-side check to ensure the 
current_user_id matches the owner_id of the document record in the database before 
serving the file content. 
2. Stateless Permission Tokens: Generate short-lived, signed tokens for downloads that 
include the user ID and file ID. The server should only process the download if the 
signature is valid. 
3. Harden XML Parsers: Given the content of the exfiltrated xxe.xml, ensure all XML 
parsers on the server have DTD and external entity processing disabled to prevent XXE 
exploitation. 
5.15 Insecure Direct Object Reference (IDOR) on Document Deletion 
Vulnerability Details 
• Vulnerability Name: IDOR on File Deletion 
• Description: The /documents/{id}/delete endpoint (or DELETE request to 
/documents/{id}) fails to verify ownership of the resource before executing the deletion 
command in the database. An attacker can systematically delete all documents in the 
system by iterating through sequential integer IDs. 
CVSS v3.0 Score & Severity Rating 
• CVSS v3.0 Score: 8.1 (High) 
• Severity Rating: HIGH 
Affected Components/Endpoints 
• Vulnerable Endpoint: /documents/{id}/delete 
• Impacted Action: Permanent Data Deletion 
Technical and Business Impact 
• Technical Impact: Unauthorized modification and destruction of data. An attacker can 
clear the entire document repository, leading to a complete loss of data integrity and 
availability for all users. 
• Business Impact: High risk of service disruption and permanent data loss. This could 
lead to significant operational downtime, loss of critical business intelligence, and severe 
reputational damage as user-uploaded content is no longer recoverable. 
Step-by-Step Reproduction Steps 
1. Log in as a standard user . 
2. Identify a document ID belonging to another user (e.g., ID 42 belonging to admin) via the 
previously exploited GraphQL documents query. 
3. Intercept the deletion request for one of your own files to identify the endpoint structure: 
POST /documents/10/delete. 
4. Modify the request to target the administrative file: POST /documents/42/delete. 
5. Send the request and observe a 200 OK or 302 Redirect response. 
6. Verify that the document with ID 42 is no longer accessible via the preview or download 
endpoints, confirming successful unauthorized deletion. 
Proof of Concept (PoC)  
Recommended Remediations 
1. Strict Ownership Verification: Implement a server-side check that queries the database 
to ensure the owner_id of the document matches the id of the currently authenticated user 
session before proceeding with the DELETE operation. 
2. Soft Deletes: Implement a "soft delete" mechanism where files are marked as deleted in 
the database rather than being immediately purged from the filesystem, allowing for 
recovery in case of accidental or malicious deletion. 
3. Non-Predictable IDs: Move away from sequential integer IDs (1, 2, 3...) and implement 
UUIDs (Universally Unique Identifiers) for all resource references to prevent easy 
enumeration by attackers. 
5.16 Insecure Direct Object Reference (IDOR) on Document 
Comments 
Vulnerability Details 
• Vulnerability Name: IDOR on Resource Comments 
• Description: The /documents/{id}/comments endpoint fails to verify if the requesting 
user has the appropriate permissions to view the parent document before returning the 
associated comments. By enumerating document IDs, an attacker can leak sensitive 
discussions or metadata related to private files. 
CVSS v3.0 Score & Severity Rating 
• CVSS v3.0 Score: 5.3 (Medium) 
• Severity Rating: MEDIUM 
Affected Components/Endpoints 
• Vulnerable Endpoint: /documents/{id}/comments 
• Affected Functionality: Social/Collaboration features (Comments) 
Technical and Business Impact 
• Technical Impact: Unauthorized information disclosure. While the raw document 
content is not directly accessed here, comments often contain sensitive context, 
passwords, internal review notes, or PI (Personal Information) that can facilitate further 
attacks. 
• Business Impact: Breach of confidentiality and data privacy. Exposure of internal 
communication can lead to reputational damage and reveal internal business processes to 
unauthorized actors. 
Step-by-Step Reproduction Steps 
1. Log in as a standard user and identify a valid session cookie. 
2. Attempt to access the comments for a document you own to identify the endpoint 
structure: GET /documents/45/comments. 
3. Modify the request to target a document ID that does not belong to you (e.g., ID 40). 
4. Observe that the application returns a 200 OK response containing the comments array 
for the unauthorized document, even if direct access to the document metadata is 
blocked. 
Proof of Concept (PoC) 
Recommended Remediations 
1. Inherited Authorization Check: Before returning comments, the server must first 
perform an authorization check on the parent document_id to ensure the requester has 
READ access to that resource. 
2. Centralized Access Control: Implement a unified "CheckAccess" function that is called 
at the beginning of all resource-dependent resolvers (including sub-resources like 
comments). 
3. UUIDs for Resources: Replace integer-based IDs with UUIDs across the entire 
application to prevent attackers from easily enumerating and discovering valid resource 
IDs. 
5.17 Critical Information Disclosure via Internal Admin 
API 
Vulnerability Details 
• Vulnerability Name: Sensitive Information Disclosure (Internal Configuration) 
• Description: The internal administrative API endpoint returns a JSON object containing 
the application's core configuration when accessed with valid credentials. This 
configuration includes the absolute filesystem path to the SQLite database and the 
secret_key used for signing session cookies and tokens. 
CVSS v3.0 Score & Severity Rating 
• CVSS v3.0 Score: 9.1 (Critical) 
• Severity Rating: CRITICAL 
Affected Components/Endpoints 
• Vulnerable Endpoint: /api/v1/internal/admin 
• Leaked Data Points: database, secret_key 
Technical and Business Impact 
• Technical Impact: The leak of the database path (sqlite:////app/instance/nexusvault.db) 
provides the exact target for the previously discovered LFI vulnerability, allowing for a 
full database download. Furthermore, the exposure of the secret_key (53a3c616f4...) 
enables an attacker to forge session cookies, effectively granting them the ability to 
impersonate any user on the system. 
• Business Impact: Total loss of data confidentiality and integrity. Exposure of the 
application's root secrets means the entire security model of NexusVault is compromised, 
requiring a complete rotation of all user sessions and backend credentials. 
Step-by-Step Reproduction Steps 
1. Identify the internal admin API path from the client-side JavaScript source code. 
2. Obtain the X-API-Key (nvk_d56f1953e015cc01e79c84028089135d) from the leaked 
/__debug/users response. 
3. Execute a request to /api/v1/internal/admin including the X-Forwarded-For: 127.0.0.1 
header to bypass the IP whitelist. 
4. Analyze the config object in the response to extract the database path and the application 
secret key. 
Proof of Concept (PoC) 
Recommended Remediations 
1. Remove Secrets from API Responses: Administrative APIs should never return high
entropy secrets like secret_key or full database connection strings in their response 
bodies. 
2. Harden Authentication: Replace the static X-API-Key with a dynamic, short-lived 
OIDC or OAuth2 token-based system. 
3. Rotate Compromised Secrets: Immediately rotate the application's secret_key  
5.18 Information Exposure of Unresolved Security Vulnerabilities 
Vulnerability Details 
• Vulnerability Name: Information Exposure of Known Security Weaknesses 
• Description: The production source code contains detailed notes on the application's 
security backlog. This includes mentions of critical vulnerabilities like XSLT Injection, 
JWT Algorithm Confusion, and the continued presence of Debug Endpoints in 
production. 
CVSS v3.0 Score & Severity Rating 
• CVSS v3.0 Score: 5.3 (Medium) 
• Severity Rating: MEDIUM 
Affected Components/Endpoints 
• Vulnerable Source: Client-side HTML source code 
• Impacted Areas: XSLT processing, JWT authentication logic, and the /__debug/ 
directory 
Technical and Business Impact 
• Technical Impact: Provides an attacker with a verified "vulnerability roadmap". 
Knowing that XSLT Injection (ENG-4892) is a deferred issue allows an attacker to 
focus their efforts on finding the specific inputs that process XSLT, significantly 
lowering the barrier to achieving Remote Code Execution (RCE). 
• Business Impact: High reputational risk and increased likelihood of a successful breach. 
Publicly documenting that security fixes are "deferred" or in a "backlog" while the 
application is live shows a lack of due diligence in protecting user data. 
Step-by-Step Reproduction Steps 
1. Navigate to the main page of the application: https://nexusvault.space. 
2. Right-click and select "View Page Source". 
3. Scroll to the bottom of the file to find the closing --> comment tag. 
4. Observe the "Known Issues" list documenting active security flaws. 
Proof of Concept (PoC) 
Recommended Remediations 
1. Strict Source Code Hygiene: Ensure that internal engineering notes, Jira tickets, and 
vulnerability backlogs are never included in production code comments. 
2. Immediate Remediation of "TODO" Items: Prioritize the removal of debug endpoints 
(ENG-2892) as they have already been successfully exploited during this assessment. 
3. Secure JWT Implementation: Address the "backlog" item ENG-3456 by ensuring the 
application strictly enforces a single, strong signature algorithm (e.g., RS256) and 
validates the alg header against an allow-list. 
4. Harden XSLT Processing: Fix the "deferred" XSLT injection flaw (ENG-4892) by 
disabling all external entity resolution and extension functions in the XML/XSLT parser. 