// Generated from /Users/spurcell/dev/exa/parser/exa.g4 by ANTLR 4.5.3
// jshint ignore: start
var antlr4 = require('antlr4/index');


var serializedATN = ["\u0003\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\u0002C\u01e1\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004",
    "\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010",
    "\t\u0010\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013",
    "\u0004\u0014\t\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017",
    "\t\u0017\u0004\u0018\t\u0018\u0004\u0019\t\u0019\u0004\u001a\t\u001a",
    "\u0004\u001b\t\u001b\u0004\u001c\t\u001c\u0004\u001d\t\u001d\u0004\u001e",
    "\t\u001e\u0004\u001f\t\u001f\u0004 \t \u0004!\t!\u0004\"\t\"\u0004#",
    "\t#\u0004$\t$\u0004%\t%\u0004&\t&\u0004\'\t\'\u0004(\t(\u0004)\t)\u0004",
    "*\t*\u0004+\t+\u0004,\t,\u0004-\t-\u0004.\t.\u0004/\t/\u00040\t0\u0004",
    "1\t1\u00042\t2\u00043\t3\u00044\t4\u00045\t5\u00046\t6\u00047\t7\u0004",
    "8\t8\u00049\t9\u0004:\t:\u0004;\t;\u0004<\t<\u0004=\t=\u0004>\t>\u0004",
    "?\t?\u0004@\t@\u0004A\tA\u0004B\tB\u0004C\tC\u0004D\tD\u0004E\tE\u0004",
    "F\tF\u0004G\tG\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003",
    "\b\u0003\b\u0003\b\u0003\t\u0003\t\u0003\t\u0003\n\u0003\n\u0003\n\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\f\u0003\f\u0003\f\u0003\r\u0003\r\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u0010\u0003\u0010\u0003\u0010",
    "\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0012\u0003\u0012\u0003\u0012",
    "\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0014\u0003\u0014\u0003\u0014",
    "\u0003\u0014\u0003\u0014\u0003\u0015\u0003\u0015\u0003\u0016\u0003\u0016",
    "\u0003\u0017\u0003\u0017\u0003\u0018\u0003\u0018\u0003\u0019\u0003\u0019",
    "\u0003\u0019\u0003\u0019\u0003\u001a\u0003\u001a\u0003\u001a\u0003\u001a",
    "\u0003\u001a\u0003\u001a\u0003\u001b\u0003\u001b\u0003\u001c\u0003\u001c",
    "\u0003\u001d\u0003\u001d\u0003\u001e\u0003\u001e\u0003\u001f\u0003\u001f",
    "\u0003 \u0003 \u0003!\u0003!\u0003\"\u0003\"\u0003\"\u0003#\u0003#\u0003",
    "#\u0003$\u0003$\u0003$\u0003%\u0003%\u0003%\u0003&\u0003&\u0003&\u0003",
    "&\u0003\'\u0003\'\u0003\'\u0003(\u0003(\u0003(\u0003)\u0003)\u0003)",
    "\u0003*\u0003*\u0003+\u0003+\u0003,\u0003,\u0003,\u0003-\u0003-\u0003",
    "-\u0003-\u0003.\u0003.\u0003/\u0003/\u00030\u00030\u00030\u00031\u0003",
    "1\u00031\u00031\u00031\u00031\u00031\u00032\u00032\u00032\u00033\u0006",
    "3\u0139\n3\r3\u000e3\u013a\u00033\u00033\u00034\u00034\u00034\u0003",
    "4\u00074\u0143\n4\f4\u000e4\u0146\u000b4\u00034\u00054\u0149\n4\u0003",
    "4\u00034\u00034\u00034\u00035\u00035\u00035\u00035\u00075\u0153\n5\f",
    "5\u000e5\u0156\u000b5\u00035\u00035\u00035\u00035\u00035\u00036\u0003",
    "6\u00037\u00037\u00038\u00038\u00039\u00039\u00039\u00079\u0166\n9\f",
    "9\u000e9\u0169\u000b9\u00059\u016b\n9\u0003:\u0003:\u0005:\u016f\n:",
    "\u0003:\u0003:\u0003;\u0003;\u0003;\u0003<\u0003<\u0003=\u0003=\u0003",
    "=\u0003=\u0003>\u0003>\u0003>\u0003>\u0003>\u0003>\u0003>\u0003>\u0003",
    ">\u0005>\u0185\n>\u0003?\u0003?\u0003?\u0003@\u0003@\u0003A\u0005A\u018d",
    "\nA\u0003A\u0003A\u0003A\u0006A\u0192\nA\rA\u000eA\u0193\u0003A\u0005",
    "A\u0197\nA\u0003A\u0005A\u019a\nA\u0003A\u0003A\u0003A\u0003A\u0005",
    "A\u01a0\nA\u0003A\u0005A\u01a3\nA\u0003B\u0003B\u0003B\u0007B\u01a8",
    "\nB\fB\u000eB\u01ab\u000bB\u0003C\u0003C\u0003C\u0007C\u01b0\nC\fC\u000e",
    "C\u01b3\u000bC\u0003C\u0003C\u0003C\u0003D\u0003D\u0003D\u0007D\u01bb",
    "\nD\fD\u000eD\u01be\u000bD\u0003D\u0003D\u0003D\u0003E\u0003E\u0003",
    "E\u0007E\u01c6\nE\fE\u000eE\u01c9\u000bE\u0003E\u0003E\u0003E\u0003",
    "F\u0003F\u0003F\u0007F\u01d1\nF\fF\u000eF\u01d4\u000bF\u0003F\u0003",
    "F\u0003F\u0003G\u0003G\u0006G\u01db\nG\rG\u000eG\u01dc\u0003G\u0003",
    "G\u0003G\u0004\u0144\u0154\u0002H\u0003\u0003\u0005\u0004\u0007\u0005",
    "\t\u0006\u000b\u0007\r\b\u000f\t\u0011\n\u0013\u000b\u0015\f\u0017\r",
    "\u0019\u000e\u001b\u000f\u001d\u0010\u001f\u0011!\u0012#\u0013%\u0014",
    "\'\u0015)\u0016+\u0017-\u0018/\u00191\u001a3\u001b5\u001c7\u001d9\u001e",
    ";\u001f= ?!A\"C#E$G%I&K\'M(O)Q*S+U,W-Y.[/]0_1a2c3e4g5i6k7m8o\u0002q",
    "\u0002s\u0002u\u0002w\u0002y9{:};\u007f<\u0081=\u0083>\u0085?\u0087",
    "@\u0089A\u008bB\u008dC\u0003\u0002\t\u0005\u0002\u000b\f\u000f\u000f",
    "\"\"\u0003\u00023;\u0004\u0002GGgg\u0004\u0002--//\b\u0002$$^^ddppt",
    "tvv\u0005\u0002C\\aac|\u0004\u0002$$bb\u01f5\u0002\u0003\u0003\u0002",
    "\u0002\u0002\u0002\u0005\u0003\u0002\u0002\u0002\u0002\u0007\u0003\u0002",
    "\u0002\u0002\u0002\t\u0003\u0002\u0002\u0002\u0002\u000b\u0003\u0002",
    "\u0002\u0002\u0002\r\u0003\u0002\u0002\u0002\u0002\u000f\u0003\u0002",
    "\u0002\u0002\u0002\u0011\u0003\u0002\u0002\u0002\u0002\u0013\u0003\u0002",
    "\u0002\u0002\u0002\u0015\u0003\u0002\u0002\u0002\u0002\u0017\u0003\u0002",
    "\u0002\u0002\u0002\u0019\u0003\u0002\u0002\u0002\u0002\u001b\u0003\u0002",
    "\u0002\u0002\u0002\u001d\u0003\u0002\u0002\u0002\u0002\u001f\u0003\u0002",
    "\u0002\u0002\u0002!\u0003\u0002\u0002\u0002\u0002#\u0003\u0002\u0002",
    "\u0002\u0002%\u0003\u0002\u0002\u0002\u0002\'\u0003\u0002\u0002\u0002",
    "\u0002)\u0003\u0002\u0002\u0002\u0002+\u0003\u0002\u0002\u0002\u0002",
    "-\u0003\u0002\u0002\u0002\u0002/\u0003\u0002\u0002\u0002\u00021\u0003",
    "\u0002\u0002\u0002\u00023\u0003\u0002\u0002\u0002\u00025\u0003\u0002",
    "\u0002\u0002\u00027\u0003\u0002\u0002\u0002\u00029\u0003\u0002\u0002",
    "\u0002\u0002;\u0003\u0002\u0002\u0002\u0002=\u0003\u0002\u0002\u0002",
    "\u0002?\u0003\u0002\u0002\u0002\u0002A\u0003\u0002\u0002\u0002\u0002",
    "C\u0003\u0002\u0002\u0002\u0002E\u0003\u0002\u0002\u0002\u0002G\u0003",
    "\u0002\u0002\u0002\u0002I\u0003\u0002\u0002\u0002\u0002K\u0003\u0002",
    "\u0002\u0002\u0002M\u0003\u0002\u0002\u0002\u0002O\u0003\u0002\u0002",
    "\u0002\u0002Q\u0003\u0002\u0002\u0002\u0002S\u0003\u0002\u0002\u0002",
    "\u0002U\u0003\u0002\u0002\u0002\u0002W\u0003\u0002\u0002\u0002\u0002",
    "Y\u0003\u0002\u0002\u0002\u0002[\u0003\u0002\u0002\u0002\u0002]\u0003",
    "\u0002\u0002\u0002\u0002_\u0003\u0002\u0002\u0002\u0002a\u0003\u0002",
    "\u0002\u0002\u0002c\u0003\u0002\u0002\u0002\u0002e\u0003\u0002\u0002",
    "\u0002\u0002g\u0003\u0002\u0002\u0002\u0002i\u0003\u0002\u0002\u0002",
    "\u0002k\u0003\u0002\u0002\u0002\u0002m\u0003\u0002\u0002\u0002\u0002",
    "y\u0003\u0002\u0002\u0002\u0002{\u0003\u0002\u0002\u0002\u0002}\u0003",
    "\u0002\u0002\u0002\u0002\u007f\u0003\u0002\u0002\u0002\u0002\u0081\u0003",
    "\u0002\u0002\u0002\u0002\u0083\u0003\u0002\u0002\u0002\u0002\u0085\u0003",
    "\u0002\u0002\u0002\u0002\u0087\u0003\u0002\u0002\u0002\u0002\u0089\u0003",
    "\u0002\u0002\u0002\u0002\u008b\u0003\u0002\u0002\u0002\u0002\u008d\u0003",
    "\u0002\u0002\u0002\u0003\u008f\u0003\u0002\u0002\u0002\u0005\u009a\u0003",
    "\u0002\u0002\u0002\u0007\u009f\u0003\u0002\u0002\u0002\t\u00a5\u0003",
    "\u0002\u0002\u0002\u000b\u00aa\u0003\u0002\u0002\u0002\r\u00b5\u0003",
    "\u0002\u0002\u0002\u000f\u00b7\u0003\u0002\u0002\u0002\u0011\u00ba\u0003",
    "\u0002\u0002\u0002\u0013\u00bd\u0003\u0002\u0002\u0002\u0015\u00c0\u0003",
    "\u0002\u0002\u0002\u0017\u00c6\u0003\u0002\u0002\u0002\u0019\u00c9\u0003",
    "\u0002\u0002\u0002\u001b\u00cb\u0003\u0002\u0002\u0002\u001d\u00ce\u0003",
    "\u0002\u0002\u0002\u001f\u00d1\u0003\u0002\u0002\u0002!\u00d4\u0003",
    "\u0002\u0002\u0002#\u00d7\u0003\u0002\u0002\u0002%\u00da\u0003\u0002",
    "\u0002\u0002\'\u00dd\u0003\u0002\u0002\u0002)\u00e2\u0003\u0002\u0002",
    "\u0002+\u00e4\u0003\u0002\u0002\u0002-\u00e6\u0003\u0002\u0002\u0002",
    "/\u00e8\u0003\u0002\u0002\u00021\u00ea\u0003\u0002\u0002\u00023\u00ee",
    "\u0003\u0002\u0002\u00025\u00f4\u0003\u0002\u0002\u00027\u00f6\u0003",
    "\u0002\u0002\u00029\u00f8\u0003\u0002\u0002\u0002;\u00fa\u0003\u0002",
    "\u0002\u0002=\u00fc\u0003\u0002\u0002\u0002?\u00fe\u0003\u0002\u0002",
    "\u0002A\u0100\u0003\u0002\u0002\u0002C\u0102\u0003\u0002\u0002\u0002",
    "E\u0105\u0003\u0002\u0002\u0002G\u0108\u0003\u0002\u0002\u0002I\u010b",
    "\u0003\u0002\u0002\u0002K\u010e\u0003\u0002\u0002\u0002M\u0112\u0003",
    "\u0002\u0002\u0002O\u0115\u0003\u0002\u0002\u0002Q\u0118\u0003\u0002",
    "\u0002\u0002S\u011b\u0003\u0002\u0002\u0002U\u011d\u0003\u0002\u0002",
    "\u0002W\u011f\u0003\u0002\u0002\u0002Y\u0122\u0003\u0002\u0002\u0002",
    "[\u0126\u0003\u0002\u0002\u0002]\u0128\u0003\u0002\u0002\u0002_\u012a",
    "\u0003\u0002\u0002\u0002a\u012d\u0003\u0002\u0002\u0002c\u0134\u0003",
    "\u0002\u0002\u0002e\u0138\u0003\u0002\u0002\u0002g\u013e\u0003\u0002",
    "\u0002\u0002i\u014e\u0003\u0002\u0002\u0002k\u015c\u0003\u0002\u0002",
    "\u0002m\u015e\u0003\u0002\u0002\u0002o\u0160\u0003\u0002\u0002\u0002",
    "q\u016a\u0003\u0002\u0002\u0002s\u016c\u0003\u0002\u0002\u0002u\u0172",
    "\u0003\u0002\u0002\u0002w\u0175\u0003\u0002\u0002\u0002y\u0177\u0003",
    "\u0002\u0002\u0002{\u0184\u0003\u0002\u0002\u0002}\u0186\u0003\u0002",
    "\u0002\u0002\u007f\u0189\u0003\u0002\u0002\u0002\u0081\u01a2\u0003\u0002",
    "\u0002\u0002\u0083\u01a4\u0003\u0002\u0002\u0002\u0085\u01ac\u0003\u0002",
    "\u0002\u0002\u0087\u01b7\u0003\u0002\u0002\u0002\u0089\u01c2\u0003\u0002",
    "\u0002\u0002\u008b\u01cd\u0003\u0002\u0002\u0002\u008d\u01d8\u0003\u0002",
    "\u0002\u0002\u008f\u0090\u0007t\u0002\u0002\u0090\u0091\u0007g\u0002",
    "\u0002\u0091\u0092\u0007h\u0002\u0002\u0092\u0093\u0007g\u0002\u0002",
    "\u0093\u0094\u0007t\u0002\u0002\u0094\u0095\u0007g\u0002\u0002\u0095",
    "\u0096\u0007p\u0002\u0002\u0096\u0097\u0007e\u0002\u0002\u0097\u0098",
    "\u0007g\u0002\u0002\u0098\u0099\u0007u\u0002\u0002\u0099\u0004\u0003",
    "\u0002\u0002\u0002\u009a\u009b\u0007t\u0002\u0002\u009b\u009c\u0007",
    "g\u0002\u0002\u009c\u009d\u0007h\u0002\u0002\u009d\u009e\u0007u\u0002",
    "\u0002\u009e\u0006\u0003\u0002\u0002\u0002\u009f\u00a0\u0007t\u0002",
    "\u0002\u00a0\u00a1\u0007g\u0002\u0002\u00a1\u00a2\u0007r\u0002\u0002",
    "\u00a2\u00a3\u0007n\u0002\u0002\u00a3\u00a4\u0007{\u0002\u0002\u00a4",
    "\b\u0003\u0002\u0002\u0002\u00a5\u00a6\u0007h\u0002\u0002\u00a6\u00a7",
    "\u0007c\u0002\u0002\u00a7\u00a8\u0007k\u0002\u0002\u00a8\u00a9\u0007",
    "n\u0002\u0002\u00a9\n\u0003\u0002\u0002\u0002\u00aa\u00ab\u0007u\u0002",
    "\u0002\u00ab\u00ac\u0007w\u0002\u0002\u00ac\u00ad\u0007d\u0002\u0002",
    "\u00ad\u00ae\u0007u\u0002\u0002\u00ae\u00af\u0007v\u0002\u0002\u00af",
    "\u00b0\u0007k\u0002\u0002\u00b0\u00b1\u0007v\u0002\u0002\u00b1\u00b2",
    "\u0007w\u0002\u0002\u00b2\u00b3\u0007v\u0002\u0002\u00b3\u00b4\u0007",
    "g\u0002\u0002\u00b4\f\u0003\u0002\u0002\u0002\u00b5\u00b6\u0007=\u0002",
    "\u0002\u00b6\u000e\u0003\u0002\u0002\u0002\u00b7\u00b8\u0007-\u0002",
    "\u0002\u00b8\u00b9\u0007-\u0002\u0002\u00b9\u0010\u0003\u0002\u0002",
    "\u0002\u00ba\u00bb\u0007/\u0002\u0002\u00bb\u00bc\u0007/\u0002\u0002",
    "\u00bc\u0012\u0003\u0002\u0002\u0002\u00bd\u00be\u0007@\u0002\u0002",
    "\u00be\u00bf\u0007@\u0002\u0002\u00bf\u0014\u0003\u0002\u0002\u0002",
    "\u00c0\u00c1\u0007y\u0002\u0002\u00c1\u00c2\u0007j\u0002\u0002\u00c2",
    "\u00c3\u0007k\u0002\u0002\u00c3\u00c4\u0007n\u0002\u0002\u00c4\u00c5",
    "\u0007g\u0002\u0002\u00c5\u0016\u0003\u0002\u0002\u0002\u00c6\u00c7",
    "\u0007k\u0002\u0002\u00c7\u00c8\u0007u\u0002\u0002\u00c8\u0018\u0003",
    "\u0002\u0002\u0002\u00c9\u00ca\u0007?\u0002\u0002\u00ca\u001a\u0003",
    "\u0002\u0002\u0002\u00cb\u00cc\u0007-\u0002\u0002\u00cc\u00cd\u0007",
    "?\u0002\u0002\u00cd\u001c\u0003\u0002\u0002\u0002\u00ce\u00cf\u0007",
    "/\u0002\u0002\u00cf\u00d0\u0007?\u0002\u0002\u00d0\u001e\u0003\u0002",
    "\u0002\u0002\u00d1\u00d2\u0007,\u0002\u0002\u00d2\u00d3\u0007?\u0002",
    "\u0002\u00d3 \u0003\u0002\u0002\u0002\u00d4\u00d5\u00071\u0002\u0002",
    "\u00d5\u00d6\u0007?\u0002\u0002\u00d6\"\u0003\u0002\u0002\u0002\u00d7",
    "\u00d8\u0007\'\u0002\u0002\u00d8\u00d9\u0007?\u0002\u0002\u00d9$\u0003",
    "\u0002\u0002\u0002\u00da\u00db\u0007k\u0002\u0002\u00db\u00dc\u0007",
    "h\u0002\u0002\u00dc&\u0003\u0002\u0002\u0002\u00dd\u00de\u0007g\u0002",
    "\u0002\u00de\u00df\u0007n\u0002\u0002\u00df\u00e0\u0007u\u0002\u0002",
    "\u00e0\u00e1\u0007g\u0002\u0002\u00e1(\u0003\u0002\u0002\u0002\u00e2",
    "\u00e3\u0007*\u0002\u0002\u00e3*\u0003\u0002\u0002\u0002\u00e4\u00e5",
    "\u0007+\u0002\u0002\u00e5,\u0003\u0002\u0002\u0002\u00e6\u00e7\u0007",
    "B\u0002\u0002\u00e7.\u0003\u0002\u0002\u0002\u00e8\u00e9\u0007%\u0002",
    "\u0002\u00e90\u0003\u0002\u0002\u0002\u00ea\u00eb\u0007p\u0002\u0002",
    "\u00eb\u00ec\u0007q\u0002\u0002\u00ec\u00ed\u0007v\u0002\u0002\u00ed",
    "2\u0003\u0002\u0002\u0002\u00ee\u00ef\u0007d\u0002\u0002\u00ef\u00f0",
    "\u0007{\u0002\u0002\u00f0\u00f1\u0007v\u0002\u0002\u00f1\u00f2\u0007",
    "g\u0002\u0002\u00f2\u00f3\u0007u\u0002\u0002\u00f34\u0003\u0002\u0002",
    "\u0002\u00f4\u00f5\u0007,\u0002\u0002\u00f56\u0003\u0002\u0002\u0002",
    "\u00f6\u00f7\u00071\u0002\u0002\u00f78\u0003\u0002\u0002\u0002\u00f8",
    "\u00f9\u0007\'\u0002\u0002\u00f9:\u0003\u0002\u0002\u0002\u00fa\u00fb",
    "\u0007-\u0002\u0002\u00fb<\u0003\u0002\u0002\u0002\u00fc\u00fd\u0007",
    "/\u0002\u0002\u00fd>\u0003\u0002\u0002\u0002\u00fe\u00ff\u0007>\u0002",
    "\u0002\u00ff@\u0003\u0002\u0002\u0002\u0100\u0101\u0007@\u0002\u0002",
    "\u0101B\u0003\u0002\u0002\u0002\u0102\u0103\u0007>\u0002\u0002\u0103",
    "\u0104\u0007?\u0002\u0002\u0104D\u0003\u0002\u0002\u0002\u0105\u0106",
    "\u0007@\u0002\u0002\u0106\u0107\u0007?\u0002\u0002\u0107F\u0003\u0002",
    "\u0002\u0002\u0108\u0109\u0007?\u0002\u0002\u0109\u010a\u0007?\u0002",
    "\u0002\u010aH\u0003\u0002\u0002\u0002\u010b\u010c\u0007#\u0002\u0002",
    "\u010c\u010d\u0007?\u0002\u0002\u010dJ\u0003\u0002\u0002\u0002\u010e",
    "\u010f\u0007c\u0002\u0002\u010f\u0110\u0007p\u0002\u0002\u0110\u0111",
    "\u0007f\u0002\u0002\u0111L\u0003\u0002\u0002\u0002\u0112\u0113\u0007",
    "q\u0002\u0002\u0113\u0114\u0007t\u0002\u0002\u0114N\u0003\u0002\u0002",
    "\u0002\u0115\u0116\u0007k\u0002\u0002\u0116\u0117\u0007p\u0002\u0002",
    "\u0117P\u0003\u0002\u0002\u0002\u0118\u0119\u0007@\u0002\u0002\u0119",
    "\u011a\u0007>\u0002\u0002\u011aR\u0003\u0002\u0002\u0002\u011b\u011c",
    "\u0007]\u0002\u0002\u011cT\u0003\u0002\u0002\u0002\u011d\u011e\u0007",
    "_\u0002\u0002\u011eV\u0003\u0002\u0002\u0002\u011f\u0120\u00070\u0002",
    "\u0002\u0120\u0121\u00070\u0002\u0002\u0121X\u0003\u0002\u0002\u0002",
    "\u0122\u0123\u0007e\u0002\u0002\u0123\u0124\u0007w\u0002\u0002\u0124",
    "\u0125\u0007v\u0002\u0002\u0125Z\u0003\u0002\u0002\u0002\u0126\u0127",
    "\u00070\u0002\u0002\u0127\\\u0003\u0002\u0002\u0002\u0128\u0129\u0007",
    ".\u0002\u0002\u0129^\u0003\u0002\u0002\u0002\u012a\u012b\u0007q\u0002",
    "\u0002\u012b\u012c\u0007p\u0002\u0002\u012c`\u0003\u0002\u0002\u0002",
    "\u012d\u012e\u0007k\u0002\u0002\u012e\u012f\u0007i\u0002\u0002\u012f",
    "\u0130\u0007p\u0002\u0002\u0130\u0131\u0007q\u0002\u0002\u0131\u0132",
    "\u0007t\u0002\u0002\u0132\u0133\u0007g\u0002\u0002\u0133b\u0003\u0002",
    "\u0002\u0002\u0134\u0135\u0007/\u0002\u0002\u0135\u0136\u0007@\u0002",
    "\u0002\u0136d\u0003\u0002\u0002\u0002\u0137\u0139\t\u0002\u0002\u0002",
    "\u0138\u0137\u0003\u0002\u0002\u0002\u0139\u013a\u0003\u0002\u0002\u0002",
    "\u013a\u0138\u0003\u0002\u0002\u0002\u013a\u013b\u0003\u0002\u0002\u0002",
    "\u013b\u013c\u0003\u0002\u0002\u0002\u013c\u013d\b3\u0002\u0002\u013d",
    "f\u0003\u0002\u0002\u0002\u013e\u013f\u00071\u0002\u0002\u013f\u0140",
    "\u00071\u0002\u0002\u0140\u0144\u0003\u0002\u0002\u0002\u0141\u0143",
    "\u000b\u0002\u0002\u0002\u0142\u0141\u0003\u0002\u0002\u0002\u0143\u0146",
    "\u0003\u0002\u0002\u0002\u0144\u0145\u0003\u0002\u0002\u0002\u0144\u0142",
    "\u0003\u0002\u0002\u0002\u0145\u0148\u0003\u0002\u0002\u0002\u0146\u0144",
    "\u0003\u0002\u0002\u0002\u0147\u0149\u0007\u000f\u0002\u0002\u0148\u0147",
    "\u0003\u0002\u0002\u0002\u0148\u0149\u0003\u0002\u0002\u0002\u0149\u014a",
    "\u0003\u0002\u0002\u0002\u014a\u014b\u0007\f\u0002\u0002\u014b\u014c",
    "\u0003\u0002\u0002\u0002\u014c\u014d\b4\u0002\u0002\u014dh\u0003\u0002",
    "\u0002\u0002\u014e\u014f\u00071\u0002\u0002\u014f\u0150\u0007,\u0002",
    "\u0002\u0150\u0154\u0003\u0002\u0002\u0002\u0151\u0153\u000b\u0002\u0002",
    "\u0002\u0152\u0151\u0003\u0002\u0002\u0002\u0153\u0156\u0003\u0002\u0002",
    "\u0002\u0154\u0155\u0003\u0002\u0002\u0002\u0154\u0152\u0003\u0002\u0002",
    "\u0002\u0155\u0157\u0003\u0002\u0002\u0002\u0156\u0154\u0003\u0002\u0002",
    "\u0002\u0157\u0158\u0007,\u0002\u0002\u0158\u0159\u00071\u0002\u0002",
    "\u0159\u015a\u0003\u0002\u0002\u0002\u015a\u015b\b5\u0002\u0002\u015b",
    "j\u0003\u0002\u0002\u0002\u015c\u015d\u0007}\u0002\u0002\u015dl\u0003",
    "\u0002\u0002\u0002\u015e\u015f\u0007\u007f\u0002\u0002\u015fn\u0003",
    "\u0002\u0002\u0002\u0160\u0161\u00042;\u0002\u0161p\u0003\u0002\u0002",
    "\u0002\u0162\u016b\u00072\u0002\u0002\u0163\u0167\t\u0003\u0002\u0002",
    "\u0164\u0166\u0005o8\u0002\u0165\u0164\u0003\u0002\u0002\u0002\u0166",
    "\u0169\u0003\u0002\u0002\u0002\u0167\u0165\u0003\u0002\u0002\u0002\u0167",
    "\u0168\u0003\u0002\u0002\u0002\u0168\u016b\u0003\u0002\u0002\u0002\u0169",
    "\u0167\u0003\u0002\u0002\u0002\u016a\u0162\u0003\u0002\u0002\u0002\u016a",
    "\u0163\u0003\u0002\u0002\u0002\u016br\u0003\u0002\u0002\u0002\u016c",
    "\u016e\t\u0004\u0002\u0002\u016d\u016f\t\u0005\u0002\u0002\u016e\u016d",
    "\u0003\u0002\u0002\u0002\u016e\u016f\u0003\u0002\u0002\u0002\u016f\u0170",
    "\u0003\u0002\u0002\u0002\u0170\u0171\u0005q9\u0002\u0171t\u0003\u0002",
    "\u0002\u0002\u0172\u0173\u0007^\u0002\u0002\u0173\u0174\t\u0006\u0002",
    "\u0002\u0174v\u0003\u0002\u0002\u0002\u0175\u0176\t\u0007\u0002\u0002",
    "\u0176x\u0003\u0002\u0002\u0002\u0177\u0178\u0007p\u0002\u0002\u0178",
    "\u0179\u0007k\u0002\u0002\u0179\u017a\u0007n\u0002\u0002\u017az\u0003",
    "\u0002\u0002\u0002\u017b\u017c\u0007v\u0002\u0002\u017c\u017d\u0007",
    "t\u0002\u0002\u017d\u017e\u0007w\u0002\u0002\u017e\u0185\u0007g\u0002",
    "\u0002\u017f\u0180\u0007h\u0002\u0002\u0180\u0181\u0007c\u0002\u0002",
    "\u0181\u0182\u0007n\u0002\u0002\u0182\u0183\u0007u\u0002\u0002\u0183",
    "\u0185\u0007g\u0002\u0002\u0184\u017b\u0003\u0002\u0002\u0002\u0184",
    "\u017f\u0003\u0002\u0002\u0002\u0185|\u0003\u0002\u0002\u0002\u0186",
    "\u0187\u0007?\u0002\u0002\u0187\u0188\u0007@\u0002\u0002\u0188~\u0003",
    "\u0002\u0002\u0002\u0189\u018a\u0007<\u0002\u0002\u018a\u0080\u0003",
    "\u0002\u0002\u0002\u018b\u018d\u0007/\u0002\u0002\u018c\u018b\u0003",
    "\u0002\u0002\u0002\u018c\u018d\u0003\u0002\u0002\u0002\u018d\u018e\u0003",
    "\u0002\u0002\u0002\u018e\u018f\u0005q9\u0002\u018f\u0191\u00070\u0002",
    "\u0002\u0190\u0192\u0005o8\u0002\u0191\u0190\u0003\u0002\u0002\u0002",
    "\u0192\u0193\u0003\u0002\u0002\u0002\u0193\u0191\u0003\u0002\u0002\u0002",
    "\u0193\u0194\u0003\u0002\u0002\u0002\u0194\u0196\u0003\u0002\u0002\u0002",
    "\u0195\u0197\u0005s:\u0002\u0196\u0195\u0003\u0002\u0002\u0002\u0196",
    "\u0197\u0003\u0002\u0002\u0002\u0197\u01a3\u0003\u0002\u0002\u0002\u0198",
    "\u019a\u0007/\u0002\u0002\u0199\u0198\u0003\u0002\u0002\u0002\u0199",
    "\u019a\u0003\u0002\u0002\u0002\u019a\u019b\u0003\u0002\u0002\u0002\u019b",
    "\u019c\u0005q9\u0002\u019c\u019d\u0005s:\u0002\u019d\u01a3\u0003\u0002",
    "\u0002\u0002\u019e\u01a0\u0007/\u0002\u0002\u019f\u019e\u0003\u0002",
    "\u0002\u0002\u019f\u01a0\u0003\u0002\u0002\u0002\u01a0\u01a1\u0003\u0002",
    "\u0002\u0002\u01a1\u01a3\u0005q9\u0002\u01a2\u018c\u0003\u0002\u0002",
    "\u0002\u01a2\u0199\u0003\u0002\u0002\u0002\u01a2\u019f\u0003\u0002\u0002",
    "\u0002\u01a3\u0082\u0003\u0002\u0002\u0002\u01a4\u01a9\u0005w<\u0002",
    "\u01a5\u01a8\u0005w<\u0002\u01a6\u01a8\u0005o8\u0002\u01a7\u01a5\u0003",
    "\u0002\u0002\u0002\u01a7\u01a6\u0003\u0002\u0002\u0002\u01a8\u01ab\u0003",
    "\u0002\u0002\u0002\u01a9\u01a7\u0003\u0002\u0002\u0002\u01a9\u01aa\u0003",
    "\u0002\u0002\u0002\u01aa\u0084\u0003\u0002\u0002\u0002\u01ab\u01a9\u0003",
    "\u0002\u0002\u0002\u01ac\u01b1\u0007$\u0002\u0002\u01ad\u01b0\u0005",
    "u;\u0002\u01ae\u01b0\n\b\u0002\u0002\u01af\u01ad\u0003\u0002\u0002\u0002",
    "\u01af\u01ae\u0003\u0002\u0002\u0002\u01b0\u01b3\u0003\u0002\u0002\u0002",
    "\u01b1\u01af\u0003\u0002\u0002\u0002\u01b1\u01b2\u0003\u0002\u0002\u0002",
    "\u01b2\u01b4\u0003\u0002\u0002\u0002\u01b3\u01b1\u0003\u0002\u0002\u0002",
    "\u01b4\u01b5\u0007$\u0002\u0002\u01b5\u01b6\bC\u0003\u0002\u01b6\u0086",
    "\u0003\u0002\u0002\u0002\u01b7\u01bc\u0007$\u0002\u0002\u01b8\u01bb",
    "\u0005u;\u0002\u01b9\u01bb\n\b\u0002\u0002\u01ba\u01b8\u0003\u0002\u0002",
    "\u0002\u01ba\u01b9\u0003\u0002\u0002\u0002\u01bb\u01be\u0003\u0002\u0002",
    "\u0002\u01bc\u01ba\u0003\u0002\u0002\u0002\u01bc\u01bd\u0003\u0002\u0002",
    "\u0002\u01bd\u01bf\u0003\u0002\u0002\u0002\u01be\u01bc\u0003\u0002\u0002",
    "\u0002\u01bf\u01c0\u0007b\u0002\u0002\u01c0\u01c1\bD\u0004\u0002\u01c1",
    "\u0088\u0003\u0002\u0002\u0002\u01c2\u01c7\u0007b\u0002\u0002\u01c3",
    "\u01c6\u0005u;\u0002\u01c4\u01c6\n\b\u0002\u0002\u01c5\u01c3\u0003\u0002",
    "\u0002\u0002\u01c5\u01c4\u0003\u0002\u0002\u0002\u01c6\u01c9\u0003\u0002",
    "\u0002\u0002\u01c7\u01c5\u0003\u0002\u0002\u0002\u01c7\u01c8\u0003\u0002",
    "\u0002\u0002\u01c8\u01ca\u0003\u0002\u0002\u0002\u01c9\u01c7\u0003\u0002",
    "\u0002\u0002\u01ca\u01cb\u0007b\u0002\u0002\u01cb\u01cc\bE\u0005\u0002",
    "\u01cc\u008a\u0003\u0002\u0002\u0002\u01cd\u01d2\u0007b\u0002\u0002",
    "\u01ce\u01d1\u0005u;\u0002\u01cf\u01d1\n\b\u0002\u0002\u01d0\u01ce\u0003",
    "\u0002\u0002\u0002\u01d0\u01cf\u0003\u0002\u0002\u0002\u01d1\u01d4\u0003",
    "\u0002\u0002\u0002\u01d2\u01d0\u0003\u0002\u0002\u0002\u01d2\u01d3\u0003",
    "\u0002\u0002\u0002\u01d3\u01d5\u0003\u0002\u0002\u0002\u01d4\u01d2\u0003",
    "\u0002\u0002\u0002\u01d5\u01d6\u0007$\u0002\u0002\u01d6\u01d7\bF\u0006",
    "\u0002\u01d7\u008c\u0003\u0002\u0002\u0002\u01d8\u01da\u0007>\u0002",
    "\u0002\u01d9\u01db\n\u0002\u0002\u0002\u01da\u01d9\u0003\u0002\u0002",
    "\u0002\u01db\u01dc\u0003\u0002\u0002\u0002\u01dc\u01da\u0003\u0002\u0002",
    "\u0002\u01dc\u01dd\u0003\u0002\u0002\u0002\u01dd\u01de\u0003\u0002\u0002",
    "\u0002\u01de\u01df\u0007@\u0002\u0002\u01df\u01e0\bG\u0007\u0002\u01e0",
    "\u008e\u0003\u0002\u0002\u0002\u001c\u0002\u013a\u0144\u0148\u0154\u0167",
    "\u016a\u016e\u0184\u018c\u0193\u0196\u0199\u019f\u01a2\u01a7\u01a9\u01af",
    "\u01b1\u01ba\u01bc\u01c5\u01c7\u01d0\u01d2\u01dc\b\b\u0002\u0002\u0003",
    "C\u0002\u0003D\u0003\u0003E\u0004\u0003F\u0005\u0003G\u0006"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function exaLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

exaLexer.prototype = Object.create(antlr4.Lexer.prototype);
exaLexer.prototype.constructor = exaLexer;

exaLexer.EOF = antlr4.Token.EOF;
exaLexer.T__0 = 1;
exaLexer.T__1 = 2;
exaLexer.T__2 = 3;
exaLexer.T__3 = 4;
exaLexer.T__4 = 5;
exaLexer.T__5 = 6;
exaLexer.T__6 = 7;
exaLexer.T__7 = 8;
exaLexer.T__8 = 9;
exaLexer.T__9 = 10;
exaLexer.T__10 = 11;
exaLexer.T__11 = 12;
exaLexer.T__12 = 13;
exaLexer.T__13 = 14;
exaLexer.T__14 = 15;
exaLexer.T__15 = 16;
exaLexer.T__16 = 17;
exaLexer.T__17 = 18;
exaLexer.T__18 = 19;
exaLexer.T__19 = 20;
exaLexer.T__20 = 21;
exaLexer.T__21 = 22;
exaLexer.T__22 = 23;
exaLexer.T__23 = 24;
exaLexer.T__24 = 25;
exaLexer.T__25 = 26;
exaLexer.T__26 = 27;
exaLexer.T__27 = 28;
exaLexer.T__28 = 29;
exaLexer.T__29 = 30;
exaLexer.T__30 = 31;
exaLexer.T__31 = 32;
exaLexer.T__32 = 33;
exaLexer.T__33 = 34;
exaLexer.T__34 = 35;
exaLexer.T__35 = 36;
exaLexer.T__36 = 37;
exaLexer.T__37 = 38;
exaLexer.T__38 = 39;
exaLexer.T__39 = 40;
exaLexer.T__40 = 41;
exaLexer.T__41 = 42;
exaLexer.T__42 = 43;
exaLexer.T__43 = 44;
exaLexer.T__44 = 45;
exaLexer.T__45 = 46;
exaLexer.T__46 = 47;
exaLexer.T__47 = 48;
exaLexer.T__48 = 49;
exaLexer.WS = 50;
exaLexer.LINE_COMMENT = 51;
exaLexer.COMMENT = 52;
exaLexer.BEGIN = 53;
exaLexer.END = 54;
exaLexer.NIL = 55;
exaLexer.BOOL = 56;
exaLexer.PAIR_SEP = 57;
exaLexer.FIELD_SEP = 58;
exaLexer.NUMBER = 59;
exaLexer.ID = 60;
exaLexer.STRING = 61;
exaLexer.INTER_BEGIN = 62;
exaLexer.INTER_MID = 63;
exaLexer.INTER_END = 64;
exaLexer.MODREF = 65;


exaLexer.modeNames = [ "DEFAULT_MODE" ];

exaLexer.literalNames = [ null, "'references'", "'refs'", "'reply'", "'fail'", 
                          "'substitute'", "';'", "'++'", "'--'", "'>>'", 
                          "'while'", "'is'", "'='", "'+='", "'-='", "'*='", 
                          "'/='", "'%='", "'if'", "'else'", "'('", "')'", 
                          "'@'", "'#'", "'not'", "'bytes'", "'*'", "'/'", 
                          "'%'", "'+'", "'-'", "'<'", "'>'", "'<='", "'>='", 
                          "'=='", "'!='", "'and'", "'or'", "'in'", "'><'", 
                          "'['", "']'", "'..'", "'cut'", "'.'", "','", "'on'", 
                          "'ignore'", "'->'", null, null, null, "'{'", "'}'", 
                          "'nil'", null, "'=>'", "':'" ];

exaLexer.symbolicNames = [ null, null, null, null, null, null, null, null, 
                           null, null, null, null, null, null, null, null, 
                           null, null, null, null, null, null, null, null, 
                           null, null, null, null, null, null, null, null, 
                           null, null, null, null, null, null, null, null, 
                           null, null, null, null, null, null, null, null, 
                           null, null, "WS", "LINE_COMMENT", "COMMENT", 
                           "BEGIN", "END", "NIL", "BOOL", "PAIR_SEP", "FIELD_SEP", 
                           "NUMBER", "ID", "STRING", "INTER_BEGIN", "INTER_MID", 
                           "INTER_END", "MODREF" ];

exaLexer.ruleNames = [ "T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", 
                       "T__7", "T__8", "T__9", "T__10", "T__11", "T__12", 
                       "T__13", "T__14", "T__15", "T__16", "T__17", "T__18", 
                       "T__19", "T__20", "T__21", "T__22", "T__23", "T__24", 
                       "T__25", "T__26", "T__27", "T__28", "T__29", "T__30", 
                       "T__31", "T__32", "T__33", "T__34", "T__35", "T__36", 
                       "T__37", "T__38", "T__39", "T__40", "T__41", "T__42", 
                       "T__43", "T__44", "T__45", "T__46", "T__47", "T__48", 
                       "WS", "LINE_COMMENT", "COMMENT", "BEGIN", "END", 
                       "DIGIT", "INT", "EXP", "ESC", "ID_LETTER", "NIL", 
                       "BOOL", "PAIR_SEP", "FIELD_SEP", "NUMBER", "ID", 
                       "STRING", "INTER_BEGIN", "INTER_MID", "INTER_END", 
                       "MODREF" ];

exaLexer.grammarFileName = "exa.g4";


exaLexer.prototype.action = function(localctx, ruleIndex, actionIndex) {
	switch (ruleIndex) {
	case 65:
		this.STRING_action(localctx, actionIndex);
		break;
	case 66:
		this.INTER_BEGIN_action(localctx, actionIndex);
		break;
	case 67:
		this.INTER_MID_action(localctx, actionIndex);
		break;
	case 68:
		this.INTER_END_action(localctx, actionIndex);
		break;
	case 69:
		this.MODREF_action(localctx, actionIndex);
		break;
	default:
		throw "No registered action for:" + ruleIndex;
	}
};

exaLexer.prototype.STRING_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 0:
		this.text = this.text.slice(1, -1);
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

exaLexer.prototype.INTER_BEGIN_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 1:
		this.text = this.text.slice(1, -1);
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

exaLexer.prototype.INTER_MID_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 2:
		this.text = this.text.slice(1, -1);
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

exaLexer.prototype.INTER_END_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 3:
		this.text = this.text.slice(1, -1);
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};

exaLexer.prototype.MODREF_action = function(localctx , actionIndex) {
	switch (actionIndex) {
	case 4:
		this.text = this.text.slice(1, -1);
		break;
	default:
		throw "No registered action for:" + actionIndex;
	}
};


exports.exaLexer = exaLexer;

