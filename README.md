# anisette-v3-server

koftrciali fork version

A supposedly lighter alternative to [omnisette-server](https://github.com/SideStore/omnisette-server)

Like `omnisette-server`, it supports both currently supported SideStore's protocols (anisette-v1 and 
anisette-v3) but it can also be used with AltServer-Linux.

## Run using Docker

```bash
docker run -d --restart always --name anisette-v3 -p 6969:6969 --volume anisette-v3_data:/home/Alcoholic/.config/anisette-v3/lib/ dadoum/anisette-v3-server
```

## Compile using dub

```bash
sudo apt update && sudo apt install --no-install-recommends -y ca-certificates ldc git clang dub libz-dev libssl-dev
git clone https://github.com/koftrciali/anisette-v3-server.git; cd anisette-v3-server
DC=ldc2 dub build -c "static" --build-mode allAtOnce -b release --compiler=ldc2
stat anisette-v3-server
```

## Ansible

If you want to quickly setup anisette-v3 with ansible, just use the setup-anisette-v3-ansible.yaml playbook.
Setup your inventory and choose your desired host in the playbook. Tweak your parameters/ansible.cfg for the remote_user you use. Requires root.
```bash
ansible-playbook -i inventory setup-anisette-v3-ansible.yaml -k
```

# API Documentation

## Endpoints

### /CreateSession
creates New Device session
```json
{"SessionID":"70248aaa-852d-4cff-be9d-e36b559c5825"}
```
### /Session/:id
Get Anisette for given id
```json
{
  "X-Apple-I-Client-Time": "2025-01-11T15:12:45Z",
  "X-Apple-I-MD": "AAAABQAAABDwahBmo1iUImuQrI8wlcP7AAAABA==",
  "X-Apple-I-MD-LU": "908BEFB7F4517B115E0CCAEC27047C4B99A76FBA8CBC4A7AA294E49BE7571B1A",
  "X-Apple-I-MD-M": "SKHYDiXcvGSW1qWGaa2WzwsUtn4EP7ZzNY7nFbB4N0Gt3snuNUeAogNfvc6gLwLqMFqC893FMfeW289Q",
  "X-Apple-I-MD-RINFO": "17106176",
  "X-Apple-I-SRL-NO": "0",
  "X-Apple-I-TimeZone": "UTC",
  "X-Apple-Locale": "en_US",
  "X-MMe-Client-Info": "\u003CMacBookPro13,2\u003E \u003CmacOS;13.1;22C65\u003E \u003Ccom.apple.AuthKit/1 (com.apple.dt.Xcode/3594.4.19)\u003E",
  "X-Mme-Device-Id": "DCDBBFDB-AC1E-45B3-9026-EB6AE836173E"
}
```
### /DestroySession/:id
Deletes given device session with id
```json
{"status": "success", "message": "Session destroyed"}
```
