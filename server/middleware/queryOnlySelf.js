var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const queryOnlySelf = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // expect role maker
    const { decoderRole, decodedUsername } = req.query;
    // get many only self
    if (decoderRole == 'maker') {
        if (req.query) {
            req.query["username"] = decodedUsername;
        }
    }
    console.log(">>>query only self:", req.query);
    next();
});
