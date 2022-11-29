import JSEncrypt from 'jsencrypt'

const publicKey = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKvP/EtOfnNOuwLLO4/bH59cqlxt1zZrZYqPEemT0GRG/HYzo4OvlDCvjCHCY9yL8v9ovsDuvTC963f1X8hFP5HboIfWERKgVdi/+8lPJTIFnH3sb9e3OH2beI6SbJWxeinZ4jC+zXLYZEqUUkAk+0I6EqVteGA6gwq1SGLf3Q4zAgMBAAECgYAha5eb3mziaRIffQDc/rar/Q52ZDdUspdR2HqXgNUsbFJ3e5v25ZRh1APiHTnnkKF35RwV01qhvI+tCeHTxwSSPNaSMpemVE6Izj7ZyainaPU+BTi6WEN97vO4J6b4J2S8ppF6ZYUrJ5MfW0Zu0WxdVuoh67lUWPfg9aAUVXCVQQJBAONyeiAclZH1wqAkM+mK8SmkG7xJz4bwTQFhf9hJPWaOie8TCJEHr2h+dPn5dw19g2938CWJLiubkLYyJ0kDIesCQQDBYY/leJtXDaY20oW5F8gtP1ULoA5vI/+25N8bMJpGAKtWZ1sgNMLHkYNhhSn32+merSqZuLucb0UH+3Hb/mrZAkAFJ1nnEl69QPFZCZj3iMNwKxzJxm5iY12LU3c/ImG2yjIL7cV6686osnzaETIGZzqsMu6JGzOln0/HIRnMyLpjAkA2icBedERDKetNnNPv3qAq+qiOjcZkW9+7ghLWBUANLBUmWiHeFGM2i3hlIXwzlgbuJGJWVj47ITpzxNtYswkJAkEA3F/4Vy8usqaRSSRdQ2PkIwfkk2qxGZSGu0D2aqZ2CV8VsNfETqLWTkNc9uu9C0GwbtUiN06yBo/n4dFhNVg4fg=='
const privateKey = ''

export function encrypt(pwd) {
    let jse = new JSEncrypt()
    jse.setPublicKey(publicKey)
    return jse.encrypt(pwd)
}
export function decrypt(pwd) {
    let jse = new JSEncrypt()
    jse.setPublicKey(publicKey)
    return jse.decrypt(pwd)
}
