# Didn't event attempt pt 2. Here's a solution cribbed from https://www.reddit.com/r/adventofcode/comments/7irzg5/2017_day_10_solutions/dr1095j/

f = "165,1,255,31,87,52,24,113,0,91,148,254,158,2,73,153"

lengths1 = [int(x) for x in f.strip().split(",")]
lengths2 = [ord(x) for x in f.strip()] + [17, 31, 73, 47, 23]

def run(lengths, times):
    position = 0
    skip = 0

    sequence = list(range(256))

    for _ in range(times):
        for l in lengths:
            for i in range(l // 2):
                now = (position + i) % len(sequence)
                later = (position + l - 1 - i) % len(sequence)
                sequence[now], sequence[later] = sequence[later], sequence[now]

            position += l + skip
            skip += 1

    return sequence

sequence1 = run(lengths1, 1)
sequence2 = run(lengths2, 64)

hashstr = ""
for i in range(len(sequence2) // 16):
    num = 0
    for j in range(16):
        num ^= sequence2[i * 16 + j]
    hashstr += hex(num)[2:].zfill(2)

print(sequence1[0] * sequence1[1])
print(hashstr)
