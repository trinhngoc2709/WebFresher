class Common {
  static stringToAsciiString(str) {
    try {
      return str.replaceAll(/[àáảãạâầấẩẫậăằắẳẵặ]/g, 'a')
        .replaceAll(/[èéẻẽẹêềếểễệ]/g, 'e')
        .replaceAll(/[đ]/g, 'd')
        .replaceAll(/[ìíỉĩị]/g, 'i')
        .replaceAll(/[òóỏõọôồốổỗộơờớởỡợ]/g, 'o')
        .replaceAll(/[ùúủũụưừứửữự]/g, 'u')
        .replaceAll(/[ỳýỷỹỵ]/g, 'y')
    } catch {
      return ''
    }
  }
  /**
   * 
   * @param {int} length 
   * @returns 
   */
  static randomText(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }
}