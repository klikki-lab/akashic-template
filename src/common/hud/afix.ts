/**
 * 接辞を指定する。
 */
export interface Affix {

    /** 接頭辞を指定する。指定がなければ `空文字`。 */
    prefix?: string;

    /** 接尾辞を指定する。指定がなければ `空文字`。 */
    suffix?: string;
}