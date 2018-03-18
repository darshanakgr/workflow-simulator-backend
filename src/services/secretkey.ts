import SHA256 from "crypto-js/sha256";

const generateKey = (userId: string, groupId: string) => {
    return SHA256(userId + groupId + new Date().getTime().toString()).toString();
};

export default generateKey;
