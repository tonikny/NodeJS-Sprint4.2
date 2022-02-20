
module.exports = helper = {

  /**
   * tiraDau: retorna un nombre aleatori entre 1 i 6
   */
  tiraDau: () => {
    return Math.floor(
      Math.random() * (6) + 1
    )
  }

}